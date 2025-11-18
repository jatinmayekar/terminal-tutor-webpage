"use client";

import { useEffect, useState } from "react";

interface Command {
  _id: string;
  command: string;
  category: string;
  riskLevel: "safe" | "caution" | "dangerous";
  createdAt: string;
}

export default function RecentCommands() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCommands() {
      try {
        const response = await fetch("/api/stats/sync");

        if (response.status === 403) {
          setError("premium_required");
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch commands");
        }

        const data = await response.json();
        setCommands(data.recentCommands || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCommands();
  }, []);

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

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Recent Commands</h2>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton h-16 w-full"></div>
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
          <h2 className="card-title">📜 Recent Commands</h2>
          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <div className="font-bold">Premium Feature</div>
              <div className="text-xs">Cloud command history requires Premium</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Recent Commands</h2>
          <div className="alert alert-error">
            <span>Error: {error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (commands.length === 0) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">📜 Recent Commands</h2>
          <div className="alert">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>No commands tracked yet. Start using Terminal Tutor CLI!</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">📜 Recent Commands</h2>

        <div className="overflow-x-auto max-h-96">
          <div className="space-y-2">
            {commands.map((cmd) => (
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
          Showing last {commands.length} commands
        </div>
      </div>
    </div>
  );
}
