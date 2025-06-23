'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

export type Difficulty = "easy" | "medium" | "hard" | "extreme";

const difficultyColors: Record<Difficulty, string> = {
  easy: "text-green-400 border-green-500",
  medium: "text-yellow-400 border-yellow-500",
  hard: "text-orange-400 border-orange-500",
  extreme: "text-red-400 border-red-500",
};

export default function ProblemCard({
  id,
  title,
  difficulty,
  disabled,
  solved,
}: {
  id: number;
  title: string;
  difficulty: Difficulty;
  disabled?: boolean;
  solved?: boolean;
}) {
  const link = `/problems/${id}`;

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      className={cn(
        "relative p-5 border rounded-xl bg-zinc-900/80",
        disabled
          ? "opacity-30 pointer-events-none"
          : "hover:border-white transition duration-200 cursor-pointer",
        difficultyColors[difficulty]
      )}
    >
      {/* Solved badge */}
      {solved && (
        <div className="absolute top-2 right-2">
          <CheckCircle className="w-5 h-5 text-green-400 drop-shadow-sm" />
        </div>
      )}

      <Link href={link}>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <span className="text-xs uppercase font-bold">{difficulty}</span>
        </div>
      </Link>
    </motion.div>
  );
}