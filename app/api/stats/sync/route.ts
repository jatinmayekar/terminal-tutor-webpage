import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import CommandHistory from "@/models/CommandHistory";

// POST /api/stats/sync
// Syncs command usage from Terminal Tutor CLI to cloud
// Used by Premium users for leaderboard and cross-device sync
export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongo();

    const body = await req.json();
    const { commands } = body;

    if (!commands || !Array.isArray(commands)) {
      return NextResponse.json(
        { error: "Invalid request. Expected 'commands' array" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    // Get user to update stats
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user has Premium access (required for cloud sync)
    if (!user.hasAccess) {
      return NextResponse.json(
        { error: "Premium subscription required for cloud sync" },
        { status: 403 }
      );
    }

    // Process each command
    const commandHistoryDocs = [];
    const categoryCount: Record<string, number> = {
      git: 0,
      docker: 0,
      aws: 0,
      k8s: 0,
    };
    const commandFrequency: Record<string, number> = {};

    for (const cmd of commands) {
      const { command, category, riskLevel, interactionType, timestamp } = cmd;

      if (!command || !category) {
        continue; // Skip invalid entries
      }

      // Create command history entry
      commandHistoryDocs.push({
        userId,
        command,
        category: category.toLowerCase(),
        riskLevel: riskLevel || "safe",
        interactionType: interactionType || "prediction",
        createdAt: timestamp ? new Date(timestamp) : new Date(),
      });

      // Count categories for mode preferences
      const cat = category.toLowerCase();
      if (categoryCount.hasOwnProperty(cat)) {
        categoryCount[cat]++;
      }

      // Track command frequency for favorites
      commandFrequency[command] = (commandFrequency[command] || 0) + 1;
    }

    // Bulk insert command history
    if (commandHistoryDocs.length > 0) {
      await CommandHistory.insertMany(commandHistoryDocs);
    }

    // Update user stats
    const now = new Date();
    const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;

    // Calculate streak
    let currentStreak = user.learningStreak?.current || 0;
    let longestStreak = user.learningStreak?.longest || 0;

    if (lastActive) {
      const daysSinceLastActive = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

      if (daysSinceLastActive === 0) {
        // Same day, keep streak
      } else if (daysSinceLastActive === 1) {
        // Consecutive day, increment streak
        currentStreak++;
      } else {
        // Streak broken, reset
        currentStreak = 1;
      }
    } else {
      currentStreak = 1;
    }

    longestStreak = Math.max(longestStreak, currentStreak);

    // Get top 10 favorite commands
    const sortedCommands = Object.entries(commandFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([cmd]) => cmd);

    // Update user document
    await User.findByIdAndUpdate(userId, {
      $inc: {
        commandUsageCount: commandHistoryDocs.length,
        "modePreferences.git": categoryCount.git,
        "modePreferences.docker": categoryCount.docker,
        "modePreferences.aws": categoryCount.aws,
        "modePreferences.k8s": categoryCount.k8s,
      },
      $set: {
        lastActiveDate: now,
        "learningStreak.current": currentStreak,
        "learningStreak.longest": longestStreak,
        favoriteCommands: sortedCommands,
      },
    });

    return NextResponse.json({
      success: true,
      synced: commandHistoryDocs.length,
      streak: { current: currentStreak, longest: longestStreak },
    });
  } catch (e: any) {
    console.error("Stats sync error:", e);
    return NextResponse.json(
      { error: e.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/stats/sync
// Retrieves user stats for display
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

    // Check if user has Premium access
    if (!user.hasAccess) {
      return NextResponse.json(
        { error: "Premium subscription required" },
        { status: 403 }
      );
    }

    // Get recent command history
    const recentCommands = await CommandHistory.find({ userId })
      .sort({ createdAt: -1 })
      .limit(100)
      .select("command category riskLevel createdAt");

    return NextResponse.json({
      commandUsageCount: user.commandUsageCount || 0,
      learningStreak: user.learningStreak || { current: 0, longest: 0 },
      favoriteCommands: user.favoriteCommands || [],
      modePreferences: user.modePreferences || {},
      leaderboardScores: user.leaderboardScores || {},
      recentCommands,
    });
  } catch (e: any) {
    console.error("Stats retrieval error:", e);
    return NextResponse.json(
      { error: e.message || "Internal server error" },
      { status: 500 }
    );
  }
}
