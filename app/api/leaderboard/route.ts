import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import CommandHistory from "@/models/CommandHistory";

// Helper function to calculate scores based on command usage
async function calculateUserScore(userId: string, category?: string) {
  const filter: any = { userId };
  if (category) {
    filter.category = category;
  }

  const commandCount = await CommandHistory.countDocuments(filter);

  // Get unique commands (variety bonus)
  const uniqueCommands = await CommandHistory.distinct("command", filter);
  const varietyBonus = uniqueCommands.length * 2;

  // Safety bonus: penalize dangerous commands
  const dangerousCount = await CommandHistory.countDocuments({
    ...filter,
    riskLevel: "dangerous",
  });
  const safetyPenalty = dangerousCount * 5;

  // Final score = total commands + variety bonus - safety penalty
  return Math.max(0, commandCount + varietyBonus - safetyPenalty);
}

// Helper function to calculate percentile rank
function calculatePercentile(userScore: number, allScores: number[]): number {
  if (allScores.length === 0) return 100;

  const sortedScores = allScores.sort((a, b) => b - a);
  const userRank = sortedScores.findIndex(score => score <= userScore);

  if (userRank === -1) return 100; // User has highest score

  const percentile = ((sortedScores.length - userRank) / sortedScores.length) * 100;
  return Math.round(percentile);
}

// GET /api/leaderboard
// Returns global leaderboard and user's rank (Premium feature)
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongo();

    const userId = session.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user has Premium access (leaderboard is Premium feature)
    if (!user.hasAccess) {
      return NextResponse.json(
        {
          error: "Premium subscription required",
          message: "Leaderboard access requires Premium. Upgrade at terminaltutor.dev/premium",
        },
        { status: 403 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category"); // Optional: git, docker, aws, k8s
    const limit = parseInt(searchParams.get("limit") || "50");

    // Calculate scores for all users with activity
    const allUsers = await User.find({ commandUsageCount: { $gt: 0 } }).select("_id name commandUsageCount");

    const userScores = await Promise.all(
      allUsers.map(async (u) => {
        const score = await calculateUserScore(u._id.toString(), category || undefined);
        return {
          userId: u._id.toString(),
          name: u.name || "Anonymous",
          score,
        };
      })
    );

    // Sort by score descending
    userScores.sort((a, b) => b.score - a.score);

    // Find current user's rank
    const currentUserScore = userScores.find(us => us.userId === userId);
    const currentUserRank = userScores.findIndex(us => us.userId === userId) + 1;

    // Calculate percentile
    const allScoreValues = userScores.map(us => us.score);
    const percentile = currentUserScore
      ? calculatePercentile(currentUserScore.score, allScoreValues)
      : 0;

    // Get top N users for leaderboard (anonymized)
    const topUsers = userScores.slice(0, limit).map((us, index) => ({
      rank: index + 1,
      name: us.userId === userId ? us.name : "Anonymous", // Only show current user's name
      score: us.score,
      isCurrentUser: us.userId === userId,
    }));

    // Category-specific scores for current user
    const categoryScores = {
      git: await calculateUserScore(userId, "git"),
      docker: await calculateUserScore(userId, "docker"),
      aws: await calculateUserScore(userId, "aws"),
      k8s: await calculateUserScore(userId, "k8s"),
    };

    // Update user's leaderboard scores in database (async, don't wait)
    User.findByIdAndUpdate(userId, {
      $set: {
        "leaderboardScores.gitScore": categoryScores.git,
        "leaderboardScores.dockerScore": categoryScores.docker,
        "leaderboardScores.awsScore": categoryScores.aws,
        "leaderboardScores.k8sScore": categoryScores.k8s,
        "leaderboardScores.overallRank": currentUserRank,
      },
    }).catch(err => console.error("Error updating leaderboard scores:", err));

    return NextResponse.json({
      leaderboard: topUsers,
      currentUser: {
        rank: currentUserRank,
        percentile,
        score: currentUserScore?.score || 0,
        categoryScores,
      },
      totalUsers: userScores.length,
      category: category || "overall",
    });
  } catch (e: any) {
    console.error("Leaderboard error:", e);
    return NextResponse.json(
      { error: e.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/leaderboard/recalculate
// Admin endpoint to recalculate all leaderboard scores (run periodically)
export async function POST(req: NextRequest) {
  try {
    // TODO: Add admin authentication check here
    // For now, require any valid session
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongo();

    // Get all users with command history
    const allUsers = await User.find({ commandUsageCount: { $gt: 0 } }).select("_id");

    let updated = 0;
    for (const user of allUsers) {
      const userId = user._id.toString();

      // Calculate scores for all categories
      const gitScore = await calculateUserScore(userId, "git");
      const dockerScore = await calculateUserScore(userId, "docker");
      const awsScore = await calculateUserScore(userId, "aws");
      const k8sScore = await calculateUserScore(userId, "k8s");

      await User.findByIdAndUpdate(userId, {
        $set: {
          "leaderboardScores.gitScore": gitScore,
          "leaderboardScores.dockerScore": dockerScore,
          "leaderboardScores.awsScore": awsScore,
          "leaderboardScores.k8sScore": k8sScore,
        },
      });

      updated++;
    }

    // Calculate overall ranks
    const allUserScores = await User.find({ commandUsageCount: { $gt: 0 } })
      .select("_id leaderboardScores")
      .lean();

    const rankedUsers = allUserScores
      .map(u => ({
        userId: u._id,
        totalScore: (u.leaderboardScores?.gitScore || 0) +
                   (u.leaderboardScores?.dockerScore || 0) +
                   (u.leaderboardScores?.awsScore || 0) +
                   (u.leaderboardScores?.k8sScore || 0),
      }))
      .sort((a, b) => b.totalScore - a.totalScore);

    // Update ranks
    for (let i = 0; i < rankedUsers.length; i++) {
      await User.findByIdAndUpdate(rankedUsers[i].userId, {
        $set: { "leaderboardScores.overallRank": i + 1 },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Recalculated leaderboard for ${updated} users`,
      totalUsers: rankedUsers.length,
    });
  } catch (e: any) {
    console.error("Leaderboard recalculation error:", e);
    return NextResponse.json(
      { error: e.message || "Internal server error" },
      { status: 500 }
    );
  }
}
