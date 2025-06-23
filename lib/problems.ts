export type Difficulty = "easy" | "medium" | "hard" | "extreme";

export type Problem = {
  id: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  examples: { input: string; output: string }[];
  testCases: { input: string; output: string }[];
  starterCode: Partial<Record<
    "python" | "cpp" | "java" | "javascript" | "rust" | "csharp",
    string
  >>;
};

export const problems: Problem[] = [
  // Easy (1–6)
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
      python: `a, b = map(int, input().split())\n# TODO`,
      cpp: `#include <iostream>\nusing namespace std;\nint main(){int a,b;cin>>a>>b; // TODO\n}\n`,
      java: `import java.util.*; class Main{public static void main(String[] args){Scanner sc=new Scanner(System.in);int a=sc.nextInt(),b=sc.nextInt(); // TODO}}`,
      javascript: `const [a,b]=readline().split(" ").map(Number); // TODO`,
      rust: `use std::io; fn main(){let mut s=String::new();io::stdin().read_line(&mut s).unwrap();let v: Vec<i32>=s.split_whitespace().map(|x|x.parse().unwrap()).collect(); // TODO}`,
      csharp: `using System; class P{static void Main(){var p=Console.ReadLine().Split();int a=int.Parse(p[0]),b=int.Parse(p[1]); // TODO}}`,
    },
  },
  {
    id: 2,
    title: "Check Palindrome",
    difficulty: "easy",
    description: `Check if a string is a palindrome (case‑sensitive).`,
    examples: [
      { input: "racecar", output: "true" },
      { input: "hello", output: "false" },
    ],
    testCases: [
      { input: "madam", output: "true" },
      { input: "step on no pets", output: "true" },
      { input: "robot", output: "false" },
      { input: "abcba", output: "true" },
      { input: "abc", output: "false" },
    ],
    starterCode: {
      python: `s = input().strip()\n# TODO`,
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){string s;getline(cin,s); // TODO}`,
      java: `import java.util.*; class Main{public static void main(String[] args){String s=new Scanner(System.in).nextLine(); // TODO}}`,
      javascript: `const s=readline(); // TODO`,
      rust: `use std::io; fn main(){let mut s=String::new();io::stdin().read_line(&mut s).unwrap();let s=s.trim(); // TODO}`,
      csharp: `using System; class P{static void Main(){string s=Console.ReadLine(); // TODO}}`,
    },
  },
  {
    id: 3,
    title: "Max of Three",
    difficulty: "easy",
    description: `Given three integers, output the maximum.`,
    testCases: [
      { input: "1 5 3", output: "5" },
      { input: "-1 -5 -3", output: "-1" },
      { input: "10 10 10", output: "10" },
      { input: "0 100 -50", output: "100" },
      { input: "-10 0 -20", output: "0" },
    ],
    examples: [
      { input: "1 5 3", output: "5" },
      { input: "-1 -5 -3", output: "-1" },
    ],
    starterCode: {
      python: `a,b,c=map(int,input().split())\n# TODO`,
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int a,b,c;cin>>a>>b>>c; // TODO}`,
      java: `import java.util.*;class Main{public static void main(String[] args){Scanner sc=new Scanner(System.in);int a=sc.nextInt(),b=sc.nextInt(),c=sc.nextInt(); // TODO}}`,
      javascript: `const [a,b,c]=readline().split(" ").map(Number); // TODO`,
      rust: `use std::io;fn main(){let mut s=String::new();io::stdin().read_line(&mut s).unwrap();let v: Vec<i32>=s.split_whitespace().map(|x| x.parse().unwrap()).collect();let (a,b,c)=(v[0],v[1],v[2]); // TODO}`,
      csharp: `using System;class P{static void Main(){var v=Console.ReadLine().Split();int a=int.Parse(v[0]),b=int.Parse(v[1]),c=int.Parse(v[2]); // TODO}}`,
    },
  },
  {
    id: 4,
    title: "Even or Odd",
    difficulty: "easy",
    description: `Print "Even" if a number is even, else "Odd".`,
    testCases: [
      { input: "2", output: "Even" },
      { input: "7", output: "Odd" },
      { input: "0", output: "Even" },
      { input: "-3", output: "Odd" },
      { input: "1001", output: "Odd" },
    ],
    examples: [
      { input: "2", output: "Even" },
      { input: "7", output: "Odd" },
    ],
    starterCode: {
      python: `n=int(input())\n# TODO`,
      cpp: `#include <iostream>\nusing namespace std;\nint main(){int n;cin>>n; // TODO}`,
      java: `import java.util.*; class Main{public static void main(String[] args){int n=new Scanner(System.in).nextInt(); // TODO}}`,
      javascript: `const n=parseInt(readline()); // TODO`,
      rust: `use std::io;fn main(){let mut s=String::new();io::stdin().read_line(&mut s).unwrap();let n:i32=s.trim().parse().unwrap(); // TODO}`,
      csharp: `using System;class P{static void Main(){int n=int.Parse(Console.ReadLine()); // TODO}}`,
    },
  },
  {
    id: 5,
    title: "Rectangle Area",
    difficulty: "easy",
    description: `Compute area of a rectangle given width and height.`,
    testCases: [
      { input: "3 4", output: "12" },
      { input: "10 5", output: "50" },
      { input: "0 5", output: "0" },
      { input: "7 7", output: "49" },
      { input: "100 200", output: "20000" },
    ],
    examples: [
      { input: "3 4", output: "12" },
      { input: "10 5", output: "50" },
    ],
    starterCode: {
      python: `w,h=map(int,input().split())\n# TODO`,
      cpp: `#include <iostream>\nusing namespace std;\nint main(){int w,h;cin>>w>>h; // TODO}`,
      java: `import java.util.*; class Main{public static void main(String[] args){Scanner sc=new Scanner(System.in);int w=sc.nextInt(),h=sc.nextInt(); // TODO}}`,
      javascript: `const [w,h]=readline().split(" ").map(Number); // TODO`,
      rust: `use std::io;fn main(){let mut s=String::new();io::stdin().read_line(&mut s).unwrap();let v: Vec<i32>=s.split_whitespace().map(|x| x.parse().unwrap()).collect();let (w,h)=(v[0],v[1]); // TODO}`,
      csharp: `using System;class P{static void Main(){var p=Console.ReadLine().Split();int w=int.Parse(p[0]),h=int.Parse(p[1]); // TODO}}`,
    },
  },
  {
    id: 6,
    title: "Simple Interest",
    difficulty: "easy",
    description: `Calculate simple interest with P, R, T. Output floor value.`,
    testCases: [
      { input: "1000 5 2", output: "100" },
      { input: "1500 3 4", output: "180" },
      { input: "2000 7 3", output: "420" },
      { input: "100 10 1", output: "10" },
      { input: "5000 6 5", output: "1500" },
    ],
    examples: [
      { input: "1000 5 2", output: "100" },
      { input: "2000 7 3", output: "420" },
    ],
    starterCode: {
      python: `p,r,t=map(int,input().split())\n# TODO`,
      cpp: `#include <iostream>\nusing namespace std;\nint main(){int p,r,t;cin>>p>>r>>t; // TODO}`,
      java: `import java.util.*; class Main{public static void main(String[] args){Scanner sc=new Scanner(System.in);int p=sc.nextInt(),r=sc.nextInt(),t=sc.nextInt(); // TODO}}`,
      javascript: `const [p,r,t]=readline().split(" ").map(Number); // TODO`,
      rust: `use std::io;fn main(){let mut s=String::new();io::stdin().read_line(&mut s).unwrap();let v: Vec<i32>=s.split_whitespace().map(|x| x.parse().unwrap()).collect();let (p,r,t)=(v[0],v[1],v[2]); // TODO}`,
      csharp: `using System;class P{static void Main(){var v=Console.ReadLine().Split();int p=int.Parse(v[0]),r=int.Parse(v[1]),t=int.Parse(v[2]); // TODO}}`,
    },
  },

  // Medium (7–12), Hard (13–18), Extreme (19–24) – structured similarly
  // ! Add remaining problems here with focused descriptions, testCases, examples, starterCode accordingly
];