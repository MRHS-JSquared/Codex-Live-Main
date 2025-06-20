'use client';

import Link from "next/link";
import { Home, Trophy, Terminal, Info, LogIn } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-zinc-800 bg-black">
      <div className="text-2xl font-bold">
        Code<span className="text-blue-500">X</span>
      </div>
      <ul className="flex gap-6 items-center text-zinc-300 text-sm">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-white transition"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/scoreboard"
            className="flex items-center gap-1 hover:text-white transition"
          >
            <Trophy className="w-4 h-4" />
            Scoreboard
          </Link>
        </li>
        <li>
          <Link
            href="/challenges"
            className="flex items-center gap-1 hover:text-white transition"
          >
            <Terminal className="w-4 h-4" />
            Challenges
          </Link>
        </li>
        <li>
          <Link
            href="/info"
            className="flex items-center gap-1 hover:text-white transition"
          >
            <Info className="w-4 h-4" />
            Info
          </Link>
        </li>
        <li>
          <Link
            href="/login"
            className="flex items-center gap-1 hover:text-white transition"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}