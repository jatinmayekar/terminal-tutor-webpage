import Link from "next/link";

// Mock data for preview
const mockStats = {
  commandUsageCount: 1247,
  learningStreak: {
    current: 12,
    longest: 18,
  },
  favoriteCommands: [
    "git status",
    "docker ps",
    "kubectl get pods",
    "aws s3 ls",
    "git commit",
  ],
  modePreferences: {
    git: 847,
    docker: 234,
    aws: 98,
    k8s: 68,
  },
  leaderboardScores: {
    gitScore: 3240,
    dockerScore: 890,
    awsScore: 456,
    k8sScore: 234,
    overallRank: 156,
  },
  recentCommands: [
    {
      _id: "1",
      command: "git status",
      category: "git",
      riskLevel: "safe" as const,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
    },
    {
      _id: "2",
      command: "docker ps -a",
      category: "docker",
      riskLevel: "safe" as const,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3h ago
    },
    {
      _id: "3",
      command: "rm -rf /tmp/cache",
      category: "system",
      riskLevel: "caution" as const,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5h ago
    },
    {
      _id: "4",
      command: "kubectl delete pod my-pod",
      category: "k8s",
      riskLevel: "caution" as const,
      createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7h ago
    },
    {
      _id: "5",
      command: "aws s3 sync . s3://my-bucket",
      category: "aws",
      riskLevel: "safe" as const,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1d ago
    },
  ],
};

const mockLeaderboard = {
  leaderboard: [
    { rank: 1, name: "Anonymous", score: 5420, isCurrentUser: false },
    { rank: 2, name: "Anonymous", score: 4891, isCurrentUser: false },
    { rank: 3, name: "You", score: 3240, isCurrentUser: true },
    { rank: 4, name: "Anonymous", score: 3102, isCurrentUser: false },
    { rank: 5, name: "Anonymous", score: 2876, isCurrentUser: false },
    { rank: 6, name: "Anonymous", score: 2654, isCurrentUser: false },
    { rank: 7, name: "Anonymous", score: 2431, isCurrentUser: false },
    { rank: 8, name: "Anonymous", score: 2209, isCurrentUser: false },
    { rank: 9, name: "Anonymous", score: 2087, isCurrentUser: false },
    { rank: 10, name: "Anonymous", score: 1965, isCurrentUser: false },
  ],
  currentUser: {
    rank: 156,
    percentile: 15,
    score: 3240,
    categoryScores: {
      git: 3240,
      docker: 890,
      aws: 456,
      k8s: 234,
    },
  },
  totalUsers: 1042,
  category: "overall",
};

// Preview Components
function StatsOverviewPreview() {
  const topMode = Object.entries(mockStats.modePreferences)
    .sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Commands */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-sm text-base-content/60">Total Commands</h2>
          <p className="text-4xl font-bold">{mockStats.commandUsageCount.toLocaleString()}</p>
          <p className="text-xs text-base-content/60">Predictions & suggestions</p>
        </div>
      </div>

      {/* Current Streak */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-sm text-base-content/60">Current Streak</h2>
          <p className="text-4xl font-bold">
            {mockStats.learningStreak.current} 🔥
          </p>
          <p className="text-xs text-base-content/60">
            Longest: {mockStats.learningStreak.longest} days
          </p>
        </div>
      </div>

      {/* Top Mode */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-sm text-base-content/60">Top Mode</h2>
          <p className="text-4xl font-bold uppercase">{topMode[0]}</p>
          <p className="text-xs text-base-content/60">{topMode[1]} commands</p>
        </div>
      </div>

      {/* Global Rank */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-sm text-base-content/60">Global Rank</h2>
          <p className="text-4xl font-bold">#{mockStats.leaderboardScores.overallRank}</p>
          <p className="text-xs text-base-content/60">Overall ranking</p>
        </div>
      </div>
    </div>
  );
}

function LeaderboardPreview() {
  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "dangerous":
        return <span className="badge badge-error badge-sm">🔴 Dangerous</span>;
      case "caution":
        return <span className="badge badge-warning badge-sm">🟡 Caution</span>;
      case "safe":
      default:
        return <span className="badge badge-success badge-sm">🟢 Safe</span>;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      git: "badge-primary",
      docker: "badge-secondary",
      aws: "badge-accent",
      k8s: "badge-info",
    };

    return (
      <span className={`badge ${colors[category] || "badge-ghost"} badge-sm`}>
        {category.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">🏆 Global Leaderboard</h2>

        {/* Current User Rank */}
        <div className="alert alert-success mb-4">
          <div className="flex justify-between items-center w-full">
            <div>
              <div className="font-bold">Your Rank: #{mockLeaderboard.currentUser.rank}</div>
              <div className="text-xs">Top {mockLeaderboard.currentUser.percentile}% globally</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{mockLeaderboard.currentUser.score}</div>
              <div className="text-xs">points</div>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto max-h-96">
          <table className="table table-sm table-pin-rows">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th className="text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {mockLeaderboard.leaderboard.map((entry) => (
                <tr
                  key={entry.rank}
                  className={entry.isCurrentUser ? "bg-primary/10" : ""}
                >
                  <td className="font-mono">
                    {entry.rank === 1 && "🥇"}
                    {entry.rank === 2 && "🥈"}
                    {entry.rank === 3 && "🥉"}
                    {entry.rank > 3 && `#${entry.rank}`}
                  </td>
                  <td className="font-medium">
                    {entry.isCurrentUser ? (
                      <span className="badge badge-primary badge-sm">You</span>
                    ) : (
                      entry.name
                    )}
                  </td>
                  <td className="text-right font-mono">{entry.score.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-xs text-base-content/60 mt-4 text-center">
          {mockLeaderboard.totalUsers.toLocaleString()} total users competing
        </div>
      </div>
    </div>
  );
}

function RecentCommandsPreview() {
  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "dangerous":
        return <span className="badge badge-error badge-sm">🔴 Dangerous</span>;
      case "caution":
        return <span className="badge badge-warning badge-sm">🟡 Caution</span>;
      case "safe":
      default:
        return <span className="badge badge-success badge-sm">🟢 Safe</span>;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      git: "badge-primary",
      docker: "badge-secondary",
      aws: "badge-accent",
      k8s: "badge-info",
      system: "badge-ghost",
    };

    return (
      <span className={`badge ${colors[category] || "badge-ghost"} badge-sm`}>
        {category.toUpperCase()}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">📜 Recent Commands</h2>

        <div className="overflow-x-auto max-h-96">
          <div className="space-y-2">
            {mockStats.recentCommands.map((cmd) => (
              <div
                key={cmd._id}
                className="border border-base-300 rounded-lg p-3 hover:bg-base-200 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <code className="text-sm font-mono bg-base-300 px-2 py-1 rounded">
                    {cmd.command}
                  </code>
                  <span className="text-xs text-base-content/60">
                    {formatDate(cmd.createdAt)}
                  </span>
                </div>
                <div className="flex gap-2">
                  {getCategoryBadge(cmd.category)}
                  {getRiskBadge(cmd.riskLevel)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-base-content/60 mt-4 text-center">
          Showing last {mockStats.recentCommands.length} commands
        </div>
      </div>
    </div>
  );
}

export default function DashboardPreview() {
  return (
    <main className="min-h-screen p-8 pb-24 bg-base-200">
      <section className="max-w-7xl mx-auto space-y-8">
        {/* Premium Preview Banner */}
        <div className="alert alert-info shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div className="flex-1">
            <h3 className="font-bold">Premium Dashboard Preview</h3>
            <div className="text-xs">This is a preview showing sample data. Upgrade to Premium to track your real terminal stats!</div>
          </div>
          <div className="flex gap-2">
            <Link href="/#pricing" className="btn btn-sm btn-primary">
              View Pricing
            </Link>
            <Link href="/api/auth/signin" className="btn btn-sm btn-outline">
              Sign In
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Terminal Tutor Dashboard</h1>
            <p className="text-base-content/60 mt-2">Track your terminal mastery and global rank</p>
          </div>
        </div>

        {/* Stats Overview Cards */}
        <StatsOverviewPreview />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <LeaderboardPreview />

          {/* Recent Commands */}
          <RecentCommandsPreview />
        </div>

        {/* Bottom CTA */}
        <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">Ready to track your real stats?</h2>
            <p className="text-base-content/80">
              Join 1,000+ developers mastering the terminal with Premium features:
            </p>
            <ul className="text-sm space-y-1 mt-4 text-left list-disc list-inside">
              <li>Cloud sync across all devices</li>
              <li>Global developer leaderboard</li>
              <li>Career stats for LinkedIn/resume</li>
              <li>Unlimited command history</li>
              <li>Learning insights & recommendations</li>
            </ul>
            <div className="card-actions mt-6">
              <Link href="/#pricing" className="btn btn-neutral btn-lg">
                Unlock Premium - $7/month
              </Link>
              <Link href="/api/auth/signin" className="btn btn-ghost btn-lg">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
