'use client';

import Navbar from "@/components/ui/navbar";
import { useTeam } from "@/lib/TeamContext";
import { useAuth } from "@/lib/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import Link from "next/link";

export default function TeamDashboard() {
  const { team } = useTeam();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
    else if (!team) router.push("/team");
  }, [user, team, router]);

  const copyToClipboard = () => {
    if (team?.code) navigator.clipboard.writeText(team.code);
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-1">Team Dashboard</h1>
        <p className="text-zinc-400 mb-6">
          Manage your team and track progress
        </p>

        {/* Team Info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{team?.name}</h2>
              <span className="text-xs text-white bg-zinc-700 px-2 py-1 rounded-full mt-1 inline-block">
                {team?.difficulty === 'beginner' ? 'Beginner Division' : 'Advanced Division'}
              </span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">
                {(team?.points?.[0] ?? 0) + (team?.points?.[1] ?? 0)}
              </p>
              <p className="text-sm text-zinc-400">Total Points</p>
              <p className="text-xs text-zinc-500 mt-1">
                🧠 Problems: <span className="text-white">{team?.points?.[0] ?? 0}</span> &nbsp;|&nbsp;
                🚀 Hackathon: <span className="text-white">{team?.points?.[1] ?? 0}</span>
              </p>
              {team?.hackathon && (
                <p className="text-xs mt-2">
                  <span className="text-zinc-400">🔗 Hackathon Link: </span>
                  <Link
                    href={team.hackathon}
                    className="text-blue-400 hover:underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {team.hackathon}
                  </Link>
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-zinc-400 text-sm mb-1">Team Code</p>
            <div className="bg-zinc-800 px-4 py-2 rounded-md flex justify-between items-center">
              <span className="text-white text-sm">{team?.code}</span>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-blue-400 hover:text-blue-500 text-sm"
              >
                <Copy className="w-4 h-4" /> Copy
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/problems">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
              &lt;/&gt; Solve Problems
            </Button>
          </Link>
          <Link href="/hackathon">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full">
              🏆 Submit Hackathon
            </Button>
          </Link>
          <Link href="/scoreboard">
            <Button className="bg-yellow-600 hover:bg-yellow-700 text-white w-full">
              🏅 View Leaderboard
            </Button>
          </Link>
        </div>

        {/* Team Members */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">
            Team Members ({team?.members?.length || 1})
          </h3>
          <ul className="space-y-2">
            {team?.members?.map((member, index) => (
              <li
                key={index}
                className="bg-zinc-800 px-4 py-2 rounded-md text-sm"
              >
                {member}
                {user?.username === member && " (you)"}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}