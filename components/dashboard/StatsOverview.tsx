"use client";

import { useEffect, useState } from "react";

interface UserStats {
  commandUsageCount: number;
  learningStreak: {
    current: number;
    longest: number;
  };
  favoriteCommands: string[];
  modePreferences: {
    git: number;
    docker: number;
    aws: number;
    k8s: number;
  };
  leaderboardScores: {
    gitScore: number;
    dockerScore: number;
    awsScore: number;
    k8sScore: number;
    overallRank?: number;
  };
}

export default function StatsOverview() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/stats/sync");

        if (response.status === 403) {
          // User doesn't have Premium
          setError("premium_required");
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await response.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="skeleton h-4 w-24 mb-2"></div>
              <div className="skeleton h-8 w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error === "premium_required") {
    return (
      <div className="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <h3 className="font-bold">Premium Feature</h3>
          <div className="text-xs">Cloud stats sync and leaderboard require Premium. Upgrade to unlock!</div>
        </div>
        <button className="btn btn-sm btn-primary">Upgrade to Premium</button>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error loading stats: {error}</span>
      </div>
    );
  }

  const topMode = Object.entries(stats.modePreferences)
    .sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Commands */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-sm text-base-content/60">Total Commands</h2>
          <p className="text-4xl font-bold">{stats.commandUsageCount.toLocaleString()}</p>
          <p className="text-xs text-base-content/60">Predictions & suggestions</p>
        </div>
      </div>

      {/* Current Streak */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-sm text-base-content/60">Current Streak</h2>
          <p className="text-4xl font-bold">
            {stats.learningStreak.current} 🔥
          </p>
          <p className="text-xs text-base-content/60">
            Longest: {stats.learningStreak.longest} days
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
          <p className="text-4xl font-bold">
            {stats.leaderboardScores.overallRank
              ? `#${stats.leaderboardScores.overallRank}`
              : "—"}
          </p>
          <p className="text-xs text-base-content/60">Overall ranking</p>
        </div>
      </div>
    </div>
  );
}
