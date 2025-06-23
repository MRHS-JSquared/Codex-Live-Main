'use client';

import { useAuth } from "@/lib/AuthContext";
import { useTeam } from "@/lib/TeamContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { problems } from "@/lib/problems";
import ProblemCard from "@/components/problem/ProblemCard";
import Navbar from "@/components/ui/navbar";

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
    <main className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-grow px-6 py-10 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Problems</h1>
        <p className="text-zinc-400 mb-10 text-sm">
          Solve challenges to earn points for your team.
        </p>

        {/* Easy */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Easy</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {easy.map((p) => (
              <ProblemCard
                key={p.id}
                id={p.id}
                title={p.title}
                difficulty={p.difficulty}
              />
            ))}
          </div>
        </div>

        {/* Medium */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Medium</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {medium.map((p) => (
              <ProblemCard
                key={p.id}
                id={p.id}
                title={p.title}
                difficulty={p.difficulty}
              />
            ))}
          </div>
        </div>

        {/* Hard */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">Hard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hard.map((p) => (
              <ProblemCard
                key={p.id}
                id={p.id}
                title={p.title}
                difficulty={p.difficulty}
                disabled={beginnerOnly}
              />
            ))}
          </div>
        </div>

        {/* Extreme */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-red-400 mb-4">Extreme</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {extreme.map((p) => (
              <ProblemCard
                key={p.id}
                id={p.id}
                title={p.title}
                difficulty={p.difficulty}
                disabled={beginnerOnly}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}