// lib/problems.ts

export type Difficulty = "easy" | "medium" | "hard" | "extreme";

export type Problem = {
  id: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  examples: {
    input: string;
    output: string;
  }[];
  testCases: {
    input: string;
    output: string;
  }[];
  starterCode: {
    python?: string;
    cpp?: string;
    java?: string;
    javascript?: string;
    rust?: string;
    csharp?: string;
  };
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
    testCases: [
      { input: "2 3", output: "5" },
      { input: "-5 10", output: "5" },
      { input: "100 200", output: "300" },
      { input: "-50 -70", output: "-120" },
      { input: "0 0", output: "0" },
    ],
    starterCode: {
      python: `a, b = map(int, input().split())\n# Your code here`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n  int a, b;\n  cin >> a >> b;\n  // Your code here\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int a = sc.nextInt();\n    int b = sc.nextInt();\n    // Your code here\n  }\n}`,
      javascript: `const [a, b] = readline().split(" ").map(Number);\n// Your code here`,
      rust: `use std::io;\nfn main() {\n  let mut input = String::new();\n  io::stdin().read_line(&mut input).unwrap();\n  let nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();\n  // Your code here\n}`,
      csharp: `using System;\nclass Program {\n  static void Main() {\n    var parts = Console.ReadLine().Split(' ');\n    int a = int.Parse(parts[0]);\n    int b = int.Parse(parts[1]);\n    // Your code here\n  }\n}`,
    },
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
    testCases: [
      { input: "madam", output: "true" },
      { input: "racecar", output: "true" },
      { input: "abc", output: "false" },
      { input: "a", output: "true" },
      { input: "noon", output: "true" },
    ],
    starterCode: {
      python: `s = input()\n# Your code here`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n  string s;\n  cin >> s;\n  // Your code here\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    String s = sc.next();\n    // Your code here\n  }\n}`,
      javascript: `const s = readline();\n// Your code here`,
      rust: `use std::io;\nfn main() {\n  let mut s = String::new();\n  io::stdin().read_line(&mut s).unwrap();\n  let s = s.trim();\n  // Your code here\n}`,
      csharp: `using System;\nclass Program {\n  static void Main() {\n    string s = Console.ReadLine();\n    // Your code here\n  }\n}`,
    },
  },

  // Add 22 more problems using the same format
];