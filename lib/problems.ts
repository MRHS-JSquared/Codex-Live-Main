// lib/problems.ts
export type Difficulty = "easy" | "medium" | "hard" | "extreme";

export type Problem = {
  id: number; // 1 to 24
  title: string;
  description: string;
  difficulty: Difficulty;
  examples: {
    input: string;
    output: string;
  }[];
};

export const problems: Problem[] = [
  {
    id: 1,
    title: "Sum of Two Numbers",
    difficulty: "easy",
    description: `Given two integers, return their sum.`,
    examples: [
      { input: "2 3", output: "5" },
      { input: "-5 10", output: "5" },
    ],
  },
  {
    id: 2,
    title: "Check Palindrome",
    difficulty: "easy",
    description: `Check whether a given string is a palindrome (case-sensitive).`,
    examples: [
      { input: "racecar", output: "true" },
      { input: "hello", output: "false" },
    ],
  },
  // ... add 22 more problems with increasing complexity
];
