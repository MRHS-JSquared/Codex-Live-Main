'use client';

import { Home, Trophy, Terminal, Info, LogIn } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-zinc-800 bg-black">
      <div className="text-2xl font-bold">
        Code<span className="text-blue-500">X</span>
      </div>
      <ul className="flex gap-6 items-center text-zinc-300 text-sm">
        <li>
          <a
            href="https://codex-live-main-9h9j.vercel.app/"
            className="flex items-center gap-1 hover:text-white transition"
          >
            <Home className="w-4 h-4" />
            Home
          </a>
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
        <li>
          <a
            href="/login"
            className="flex items-center gap-1 hover:text-white transition"
          >
            <LogIn className="w-4 h-4" />
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
}