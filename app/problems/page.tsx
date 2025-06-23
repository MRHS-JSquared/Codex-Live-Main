'use client';

import { useAuth } from "@/lib/AuthContext";
import { useTeam } from "@/lib/TeamContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { problems } from "@/lib/problems";
import ProblemCard from "@/components/problem/ProblemCard";
import Navbar from "@/components/ui/navbar";
import { Trophy } from "lucide-react";

export default function ProblemsPage() {
  const { user } = useAuth();
  const { team } = useTeam();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
    else if (!team) router.push("/team");
  }, [user, team, router]);

  const beginnerOnly = team?.difficulty === "beginner";

  const easy = problems.filter((p) => p.difficulty === "easy");
  const medium = problems.filter((p) => p.difficulty === "medium");
  const hard = problems.filter((p) => p.difficulty === "hard");
  const extreme = problems.filter((p) => p.difficulty === "extreme");

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-1">Problems</h1>
            <p className="text-sm text-zinc-400">
              Solve coding challenges to earn points for your team
              <br />
              <span className="text-zinc-500 text-xs">
                Hard and Extreme problems are locked for beginner division
              </span>
            </p>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <p className="text-zinc-400 text-sm">Solved</p>
            <h2 className="text-xl font-semibold">
              {team?.solved.length ?? 0}/24
            </h2>
          </div>
        </div>

        {/* Easy */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <h2 className="text-xl font-semibold">Easy</h2>
            <span className="text-sm text-zinc-400">({easy.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {easy.map((p) => (
              <ProblemCard
                key={p.id}
                id={p.id}
                title={p.title}
                difficulty={p.difficulty}
                solved={team?.solved.includes(p.id)}
              />
            ))}
          </div>
        </div>

        {/* Medium */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <h2 className="text-xl font-semibold">Medium</h2>
            <span className="text-sm text-zinc-400">({medium.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {medium.map((p) => (
              <ProblemCard
                key={p.id}
                id={p.id}
                title={p.title}
                difficulty={p.difficulty}
                solved={team?.solved.includes(p.id)}
              />
            ))}
          </div>
        </div>

        {/* Hard */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-3 w-3 rounded-full bg-orange-500" />
            <h2 className="text-xl font-semibold">Hard</h2>
            <span className="text-sm text-zinc-400">({hard.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {hard.map((p) => (
              <ProblemCard
                key={p.id}
                id={p.id}
                title={p.title}
                difficulty={p.difficulty}
                disabled={beginnerOnly}
                solved={team?.solved.includes(p.id)}
              />
            ))}
          </div>
        </div>

        {/* Extreme */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <h2 className="text-xl font-semibold">Extreme</h2>
            <span className="text-sm text-zinc-400">({extreme.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {extreme.map((p) => (
              <ProblemCard
                key={p.id}
                id={p.id}
                title={p.title}
                difficulty={p.difficulty}
                disabled={beginnerOnly}
                solved={team?.solved.includes(p.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
