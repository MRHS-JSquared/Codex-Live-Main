// components/ui/ProblemCard.tsx
'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
}: {
  id: number;
  title: string;
  difficulty: Difficulty;
  disabled?: boolean;
}) {
  const link = `/problems/${id}`;

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      className={cn(
        "p-4 border rounded-xl bg-zinc-900/80",
        disabled
          ? "opacity-30 pointer-events-none"
          : "hover:border-white transition duration-200 cursor-pointer",
        difficultyColors[difficulty]
      )}
    >
      <Link href={link}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <span className="text-xs uppercase font-bold">
            {difficulty}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
