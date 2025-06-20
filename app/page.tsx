'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 flex flex-col items-center justify-center px-6">
      {/* Hero */}
      <section className="text-center max-w-4xl py-20 space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight"
        >
          Welcome to <span className="text-white">Code</span>
          <span className="text-blue-500">X</span>
        </motion.h1>

        <p className="text-zinc-400 text-lg">
          A modern competitive programming platform built for speed, elegance, and you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg rounded-xl">
            Join the Competition
          </Button>
          <Button variant="outline" className="border-zinc-700 text-zinc-300 px-6 py-3 text-lg rounded-xl">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 max-w-5xl w-full py-16">
        {[
          {
            title: 'Real-Time Submissions',
            desc: 'Fast and secure code evaluation with instant feedback.',
          },
          {
            title: 'Live Leaderboard',
            desc: 'Track performance and rank in real-time during events.',
          },
          {
            title: 'Beautiful Interface',
            desc: 'Designed for clarity and performance on any device.',
          },
        ].map(({ title, desc }) => (
          <div key={title} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition">
            <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
            <p className="text-zinc-400 text-sm">{desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-zinc-500 text-sm py-10 text-center border-t border-zinc-800 w-full">
        © {new Date().getFullYear()} CodeX. All rights reserved.
      </footer>
    </main>
  );
}