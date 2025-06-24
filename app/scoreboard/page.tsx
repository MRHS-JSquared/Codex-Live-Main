'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/ui/navbar';

type Team = {
  name: string;
  code: string;
  difficulty: 'beginner' | 'advanced';
  points: [number, number]; // [problems, hackathon]
  members: string[];
};

export default function ScoreboardPage() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('codex-teams') || '[]');
    const sorted = [...stored].sort((a: Team, b: Team) => {
      const aTotal = a.points[0] + a.points[1];
      const bTotal = b.points[0] + b.points[1];
      return bTotal - aTotal;
    });
    setTeams(sorted);
  }, []);

  const renderLeaderboard = (division: 'beginner' | 'advanced') => {
    const filtered = teams.filter((t) => t.difficulty === division);
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          {division === 'beginner' ? 'Beginner Division' : 'Advanced Division'}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-zinc-800 bg-zinc-900 rounded-lg overflow-hidden">
            <thead className="bg-zinc-800 text-white text-sm">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Team Name</th>
                <th className="py-3 px-4">Problem Points</th>
                <th className="py-3 px-4">Hackathon Points</th>
                <th className="py-3 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((team, i) => {
                const total = team.points[0] + team.points[1];
                let bg = '';
                if (i === 0) bg = 'bg-yellow-600 text-black font-bold';
                else if (i === 1) bg = 'bg-zinc-300 text-black font-bold';
                else if (i === 2) bg = 'bg-orange-500 text-black font-bold';
                else bg = 'bg-zinc-950 text-white';

                return (
                  <tr key={team.code} className={bg}>
                    <td className="py-2 px-4">{i + 1}</td>
                    <td className="py-2 px-4">{team.name}</td>
                    <td className="py-2 px-4">{team.points[0]}</td>
                    <td className="py-2 px-4">{team.points[1]}</td>
                    <td className="py-2 px-4">{total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
        <p className="text-zinc-400 mb-10 text-sm">
          Teams are ranked by total points (problems + hackathon).
        </p>
        {renderLeaderboard('beginner')}
        {renderLeaderboard('advanced')}
      </section>
    </main>
  );
}