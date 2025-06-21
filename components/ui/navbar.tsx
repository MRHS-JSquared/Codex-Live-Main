'use client';

import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import { Home, Trophy, Users, Info, LogIn, UserPlus, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-zinc-800 bg-black">
      <div className="text-2xl font-bold">
        Code<span className="text-blue-500">X</span>
      </div>
      <ul className="flex gap-6 items-center text-zinc-300 text-sm">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-white transition">
            <Home className="w-4 h-4" />
            Home
          </Link>
        </li>
        <li>
          <Link href="/scoreboard" className="flex items-center gap-1 hover:text-white transition">
            <Trophy className="w-4 h-4" />
            Scoreboard
          </Link>
        </li>
        <li>
          <Link href="/team" className="flex items-center gap-1 hover:text-white transition">
            <Users className="w-4 h-4" />
            Team
          </Link>
        </li>
        <li>
          <Link href="/info" className="flex items-center gap-1 hover:text-white transition">
            <Info className="w-4 h-4" />
            Info
          </Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link href="/login" className="flex items-center gap-1 hover:text-white transition">
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" className="flex items-center gap-1 hover:text-white transition">
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-blue-400">{user.email}</li>
            <li
              onClick={logout}
              className="flex items-center gap-1 hover:text-white cursor-pointer transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}