import ButtonAccount from "@/components/ButtonAccount";
import StatsOverview from "@/components/dashboard/StatsOverview";
import Leaderboard from "@/components/dashboard/Leaderboard";
import RecentCommands from "@/components/dashboard/RecentCommands";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server component which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  return (
    <main className="min-h-screen p-8 pb-24 bg-base-200">
      <section className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Terminal Tutor Dashboard</h1>
            <p className="text-base-content/60 mt-2">Track your terminal mastery and global rank</p>
          </div>
          <ButtonAccount />
        </div>

        {/* Stats Overview Cards */}
        <StatsOverview />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <Leaderboard />

          {/* Recent Commands */}
          <RecentCommands />
        </div>
      </section>
    </main>
  );
}
