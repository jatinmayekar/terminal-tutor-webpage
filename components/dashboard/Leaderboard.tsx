"use client";

import { useEffect, useState } from "react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  isCurrentUser: boolean;
}

interface LeaderboardData {
  leaderboard: LeaderboardEntry[];
  currentUser: {
    rank: number;
    percentile: number;
    score: number;
    categoryScores: {
      git: number;
      docker: number;
      aws: number;
      k8s: number;
    };
  };
  totalUsers: number;
  category: string;
}

export default function Leaderboard() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState<string>("overall");

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const url = `/api/leaderboard${category !== "overall" ? `?category=${category}` : ""}`;
        const response = await fetch(url);

        if (response.status === 403) {
          setError("premium_required");
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }

        const leaderboardData = await response.json();
        setData(leaderboardData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [category]);

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Global Leaderboard</h2>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton h-12 w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error === "premium_required") {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">🏆 Global Leaderboard</h2>
          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <div className="font-bold">Premium Feature</div>
              <div className="text-xs">Unlock leaderboard access with Premium</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Global Leaderboard</h2>
          <div className="alert alert-error">
            <span>Error: {error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title">🏆 Global Leaderboard</h2>
          <div className="tabs tabs-boxed tabs-sm">
            <button
              className={`tab ${category === "overall" ? "tab-active" : ""}`}
              onClick={() => setCategory("overall")}
            >
              All
            </button>
            <button
              className={`tab ${category === "git" ? "tab-active" : ""}`}
              onClick={() => setCategory("git")}
            >
              Git
            </button>
            <button
              className={`tab ${category === "docker" ? "tab-active" : ""}`}
              onClick={() => setCategory("docker")}
            >
              Docker
            </button>
            <button
              className={`tab ${category === "aws" ? "tab-active" : ""}`}
              onClick={() => setCategory("aws")}
            >
              AWS
            </button>
            <button
              className={`tab ${category === "k8s" ? "tab-active" : ""}`}
              onClick={() => setCategory("k8s")}
            >
              K8s
            </button>
          </div>
        </div>

        {/* Current User Rank */}
        <div className="alert alert-success mb-4">
          <div className="flex justify-between items-center w-full">
            <div>
              <div className="font-bold">Your Rank: #{data.currentUser.rank}</div>
              <div className="text-xs">Top {data.currentUser.percentile}% globally</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{data.currentUser.score}</div>
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
              {data.leaderboard.map((entry) => (
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
          {data.totalUsers.toLocaleString()} total users competing
        </div>
      </div>
    </div>
  );
}
