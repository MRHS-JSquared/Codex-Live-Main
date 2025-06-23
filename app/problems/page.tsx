'use client';

import { useAuth } from "@/lib/AuthContext";
import { useTeam } from "@/lib/TeamContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { problems } from "@/lib/problems";
import ProblemCard from "@/components/problem/ProblemCard";

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
    <main className="bg-black min-h-screen text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Problems</h1>
      <p className="text-sm text-zinc-400 mb-10">
        Solve problems to earn points for your team!
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-green-400">Easy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {easy.map((problem) => (
            <ProblemCard
              key={problem.id}
              id={problem.id}
              title={problem.title}
              difficulty={problem.difficulty}
            />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-yellow-400">Medium</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medium.map((problem) => (
            <ProblemCard
              key={problem.id}
              id={problem.id}
              title={problem.title}
              difficulty={problem.difficulty}
            />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-orange-400">Hard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hard.map((problem) => (
            <ProblemCard
              key={problem.id}
              id={problem.id}
              title={problem.title}
              difficulty={problem.difficulty}
              disabled={beginnerOnly}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-red-400">Extreme</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {extreme.map((problem) => (
            <ProblemCard
              key={problem.id}
              id={problem.id}
              title={problem.title}
              difficulty={problem.difficulty}
              disabled={beginnerOnly}
            />
          ))}
        </div>
      </section>
    </main>
  );
}