'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, Trophy, Terminal, Info, LogIn } from "lucide-react";

export default function HomePage() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-zinc-800 bg-black">
        <div className="text-2xl font-bold">
          Code<span className="text-blue-500">X</span>
        </div>
        <ul className="flex gap-6 items-center text-zinc-300 text-sm">
          <li className="flex items-center gap-1 hover:text-white cursor-pointer">
            <Home className="w-4 h-4" />
            Home
          </li>
          <li className="flex items-center gap-1 hover:text-white cursor-pointer">
            <Trophy className="w-4 h-4" />
            Scoreboard
          </li>
          <li className="flex items-center gap-1 hover:text-white cursor-pointer">
            <Terminal className="w-4 h-4" />
            Challenges
          </li>
          <li className="flex items-center gap-1 hover:text-white cursor-pointer">
            <Info className="w-4 h-4" />
            Info
          </li>
          <li className="flex items-center gap-1 hover:text-white cursor-pointer">
            <LogIn className="w-4 h-4" />
            Login
          </li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center flex-grow px-6 py-20 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold"
        >
          Code<span className="text-blue-500">X</span> 2025
        </motion.h1>

        <p className="mt-2 text-sm uppercase tracking-widest text-zinc-400">
          Competitive Developers
        </p>

        <p className="mt-6 text-zinc-400 text-lg max-w-xl">
          The ultimate competitive programming platform. Code, compete, and conquer challenging algorithms.
        </p>

        <Button className="mt-8 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 text-lg rounded-xl">
          Join Competition
        </Button>
      </section>
    </main>
  );
}