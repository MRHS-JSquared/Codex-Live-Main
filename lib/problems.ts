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
  {
    id: 7,
    title: "Longest Word in a Sentence",
    difficulty: "medium",
    description: `Given a sentence (a string of words separated by spaces), return the longest word. If multiple words have the same length, return the first one.`,
    examples: [
      { input: "I love competitive programming", output: "competitive" },
      { input: "The quick brown fox", output: "quick" }
    ],
    testCases: [
      { input: "This is a sentence", output: "sentence" },
      { input: "One two three", output: "three" },
      { input: "Go go go go", output: "Go" },
      { input: "Short longish longest", output: "longest" },
      { input: "A bb ccc dddd", output: "dddd" }
    ],
    starterCode: {
      python: `s = input()\n# Your code here`,
      cpp: `#include <iostream>\n#include <sstream>\nusing namespace std;\nint main() {\n  string line;\n  getline(cin, line);\n  // Your code here\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    String line = sc.nextLine();\n    // Your code here\n  }\n}`,
      javascript: `const line = readline();\n// Your code here`,
      rust: `use std::io::{self, BufRead};\nfn main() {\n  let stdin = io::stdin();\n  let line = stdin.lock().lines().next().unwrap().unwrap();\n  // Your code here\n}`,
      csharp: `using System;\nclass Program {\n  static void Main() {\n    string line = Console.ReadLine();\n    // Your code here\n  }\n}`
    }
  },
  {
    id: 8,
    title: "Balanced Brackets",
    difficulty: "medium",
    description: `Given a string containing only '(', ')', '{', '}', '[' and ']', determine if the brackets are balanced.`,
    examples: [
      { input: "()[]{}", output: "true" },
      { input: "(]", output: "false" }
    ],
    testCases: [
      { input: "()", output: "true" },
      { input: "([]{})", output: "true" },
      { input: "(]", output: "false" },
      { input: "([)]", output: "false" },
      { input: "{[]}", output: "true" }
    ],
    starterCode: {
      python: `s = input()\n# Your code here`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n  string s;\n  cin >> s;\n  // Your code here\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    String s = sc.next();\n    // Your code here\n  }\n}`,
      javascript: `const s = readline();\n// Your code here`,
      rust: `use std::io;\nfn main() {\n  let mut s = String::new();\n  io::stdin().read_line(&mut s).unwrap();\n  let s = s.trim();\n  // Your code here\n}`,
      csharp: `using System;\nclass Program {\n  static void Main() {\n    string s = Console.ReadLine();\n    // Your code here\n  }\n}`
    }
  },
  {
    id: 9,
    title: "Count Vowels",
    difficulty: "medium",
    description: `Given a string, return the number of vowels (a, e, i, o, u) in the string. Vowels are case-insensitive.`,
    examples: [
      { input: "hello", output: "2" },
      { input: "xyz", output: "0" }
    ],
    testCases: [
      { input: "abcdef", output: "2" },
      { input: "AEIOU", output: "5" },
      { input: "bcdfg", output: "0" },
      { input: "banana", output: "3" },
      { input: "Programming", output: "3" }
    ],
    starterCode: {
      python: `s = input()\n# Your code here`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n  string s;\n  cin >> s;\n  // Your code here\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    String s = sc.next();\n    // Your code here\n  }\n}`,
      javascript: `const s = readline();\n// Your code here`,
      rust: `use std::io;\nfn main() {\n  let mut s = String::new();\n  io::stdin().read_line(&mut s).unwrap();\n  let s = s.trim();\n  // Your code here\n}`,
      csharp: `using System;\nclass Program {\n  static void Main() {\n    string s = Console.ReadLine();\n    // Your code here\n  }\n}`
    }
  },
  {
    id: 10,
    title: "Reverse Words in a Sentence",
    difficulty: "medium",
    description: `Given a sentence, reverse the words (not the characters).`,
    examples: [
      { input: "Hello world", output: "world Hello" },
      { input: "The sky is blue", output: "blue is sky The" }
    ],
    testCases: [
      { input: "I love programming", output: "programming love I" },
      { input: "One two", output: "two One" },
      { input: "A", output: "A" },
      { input: "abc def ghi", output: "ghi def abc" },
      { input: "    hello    ", output: "hello" }
    ],
    starterCode: {
      python: `s = input()\n# Your code here`,
      cpp: `#include <iostream>\n#include <sstream>\nusing namespace std;\nint main() {\n  string s;\n  getline(cin, s);\n  // Your code here\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    String s = sc.nextLine();\n    // Your code here\n  }\n}`,
      javascript: `const s = readline();\n// Your code here`,
      rust: `use std::io::{self, BufRead};\nfn main() {\n  let stdin = io::stdin();\n  let s = stdin.lock().lines().next().unwrap().unwrap();\n  // Your code here\n}`,
      csharp: `using System;\nclass Program {\n  static void Main() {\n    string s = Console.ReadLine();\n    // Your code here\n  }\n}`
    }
  },
  {
    id: 11,
    title: "Find All Duplicates",
    difficulty: "medium",
    description: `Given a list of integers (space-separated), print all elements that appear more than once. Output each duplicated number once, in sorted order.`,
    examples: [
      { input: "1 2 3 2 4 1", output: "1 2" },
      { input: "5 5 5 5", output: "5" }
    ],
    testCases: [
      { input: "1 1 2 2 3 4", output: "1 2" },
      { input: "10 20 30", output: "" },
      { input: "9 8 7 9 8 9", output: "8 9" },
      { input: "4 4 4 3 3 2", output: "3 4" },
      { input: "1 2 3 4 5", output: "" }
    ],
    starterCode: {
      python: `nums = list(map(int, input().split()))\n# Your code here`,
      cpp: `#include <iostream>\n#include <map>\nusing namespace std;\nint main() {\n  int x;\n  map<int, int> freq;\n  while (cin >> x) freq[x]++;\n  // Your code here\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    String[] parts = sc.nextLine().split(" ");\n    // Your code here\n  }\n}`,
      javascript: `const nums = readline().split(" ").map(Number);\n// Your code here`,
      rust: `use std::collections::HashMap;\nuse std::io;\nfn main() {\n  let mut line = String::new();\n  io::stdin().read_line(&mut line).unwrap();\n  let nums: Vec<i32> = line.split_whitespace().map(|x| x.parse().unwrap()).collect();\n  // Your code here\n}`,
      csharp: `using System;\nusing System.Collections.Generic;\nclass Program {\n  static void Main() {\n    var nums = Array.ConvertAll(Console.ReadLine().Split(), int.Parse);\n    // Your code here\n  }\n}`
    }
  },
  {
    id: 12,
    title: "Product of All Except Self",
    difficulty: "medium",
    description: `Given an array of integers, return a new array where each element is the product of all elements except itself. Do not use division.`,
    examples: [
      { input: "1 2 3 4", output: "24 12 8 6" },
      { input: "2 3 4 5", output: "60 40 30 24" }
    ],
    testCases: [
      { input: "1 2 3", output: "6 3 2" },
      { input: "3 2 1", output: "2 3 6" },
      { input: "5 1 10", output: "10 50 5" },
      { input: "2 4", output: "4 2" },
      { input: "9", output: "1" }
    ],
    starterCode: {
      python: `nums = list(map(int, input().split()))\n# Your code here`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n  int x;\n  vector<int> nums;\n  while (cin >> x) nums.push_back(x);\n  // Your code here\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    String[] parts = sc.nextLine().split(" ");\n    // Your code here\n  }\n}`,
      javascript: `const nums = readline().split(" ").map(Number);\n// Your code here`,
      rust: `use std::io;\nfn main() {\n  let mut line = String::new();\n  io::stdin().read_line(&mut line).unwrap();\n  let nums: Vec<i32> = line.split_whitespace().map(|x| x.parse().unwrap()).collect();\n  // Your code here\n}`,
      csharp: `using System;\nclass Program {\n  static void Main() {\n    var nums = Array.ConvertAll(Console.ReadLine().Split(), int.Parse);\n    // Your code here\n  }\n}`
    }
  }

  // Medium (7–12), Hard (13–18), Extreme (19–24) – structured similarly
  // ! Add remaining problems here with focused descriptions, testCases, examples, starterCode accordingly
];