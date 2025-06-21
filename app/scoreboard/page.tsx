'use client';

import Navbar from "@/components/ui/navbar";

export default function ScoreboardPage() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-2xl text-zinc-400">Scoreboard coming soon.</h1>
      </div>
    </main>
  );
}