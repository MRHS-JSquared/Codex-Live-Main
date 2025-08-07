'use client';

import { useAuth } from "@/lib/AuthContext";
import { useTeam } from "@/lib/TeamContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Trophy,
  Users,
  Info,
  LogIn,
  UserPlus,
  LogOut,
  Code,
  Rocket,
} from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { team } = useTeam();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

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

        {/* Show only if user is in a team */}
        {user && team && (
          <>
            <li>
              <Link href="/problems" className="flex items-center gap-1 hover:text-white transition">
                <Code className="w-4 h-4" />
                Problems
              </Link>
            </li>
            <li>
              <Link href="/hackathon" className="flex items-center gap-1 hover:text-white transition">
                <Rocket className="w-4 h-4" />
                Hackathon
              </Link>
            </li>
          </>
        )}

        <li>
          <a
            href="https://codexinfo.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition"
          >
            <Info className="w-4 h-4" />
            Info
          </a>
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
            <li className="text-blue-400">{user.username}</li>
            <li
              onClick={handleLogout}
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