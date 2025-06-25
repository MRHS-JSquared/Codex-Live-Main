export type Difficulty = "easy" | "medium" | "hard" | "extreme";

export type Problem = {
  id: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  examples: { input: string; output: string }[];
  testCases: { input: string; output: string }[];
  starterCode: {
    python: string;
    cpp: string;
    java: string;
    javascript: string;
    rust: string;
    csharp: string;
  };
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
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\nint a,b;\ncin>>a>>b; \n// TODO\n}\n`,
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
  },
  {
    id: 13,
    title: "Subarray with Target Sum",
    difficulty: "hard",
    description: `Given an array of integers and a target value, determine if there exists a contiguous subarray whose sum equals the target.`,
    examples: [
      { input: "5\n1 2 3 4 5\n9", output: "true" },
      { input: "3\n1 2 3\n7", output: "false" },
    ],
    testCases: [
      { input: "5\n1 2 3 4 5\n9", output: "true" },
      { input: "3\n1 2 3\n7", output: "false" },
      { input: "6\n3 1 4 2 2 1\n6", output: "true" },
      { input: "4\n1 1 1 1\n5", output: "false" },
      { input: "5\n2 4 -2 1 5\n3", output: "true" },
    ],
    starterCode: {
      python: `n = int(input())\narr = list(map(int, input().split()))\ntarget = int(input())\n# Your code here`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n  int n, target;\n  cin >> n;\n  vector<int> arr(n);\n  for(int i=0; i<n; i++) cin >> arr[i];\n  cin >> target;\n  // Your code here\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int n = sc.nextInt();\n    int[] arr = new int[n];\n    for(int i = 0; i < n; i++) arr[i] = sc.nextInt();\n    int target = sc.nextInt();\n    // Your code here\n  }\n}`,
      javascript: `const n = parseInt(readline());\nconst arr = readline().split(" ").map(Number);\nconst target = parseInt(readline());\n// Your code here`,
      rust: `use std::io;\nfn main() {\n  let mut line = String::new();\n  io::stdin().read_line(&mut line).unwrap();\n  let n: usize = line.trim().parse().unwrap();\n  line.clear();\n  io::stdin().read_line(&mut line).unwrap();\n  let arr: Vec<i32> = line.trim().split_whitespace().map(|x| x.parse().unwrap()).collect();\n  line.clear();\n  io::stdin().read_line(&mut line).unwrap();\n  let target: i32 = line.trim().parse().unwrap();\n  // Your code here\n}`,
      csharp: `using System;\nclass Program {\n  static void Main() {\n    int n = int.Parse(Console.ReadLine());\n    var arr = Array.ConvertAll(Console.ReadLine().Split(' '), int.Parse);\n    int target = int.Parse(Console.ReadLine());\n    // Your code here\n  }\n}`,
    },
  },
  {
    id: 14,
    title: "Evaluate Postfix Expression",
    difficulty: "hard",
    description: `Evaluate a postfix expression (Reverse Polish Notation). Tokens are space-separated.`,
    examples: [
      { input: "2 3 + 5 *", output: "25" },
      { input: "4 2 / 3 -", output: "-1" },
    ],
    testCases: [
      { input: "2 3 + 5 *", output: "25" },
      { input: "4 2 / 3 -", output: "-1" },
      { input: "5 1 2 + 4 * + 3 -", output: "14" },
      { input: "3 4 +", output: "7" },
      { input: "10 6 9 3 + -11 * / * 17 + 5 +", output: "22" },
    ],
    starterCode: {
      python: `tokens = input().split()\n# Your code here`,
      cpp: `#include <iostream>\n#include <stack>\nusing namespace std;\nint main() {\n  string token;\n  stack<int> stk;\n  while (cin >> token) {\n    // Your code here\n  }\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    String[] tokens = sc.nextLine().split(" ");\n    // Your code here\n  }\n}`,
      javascript: `const tokens = readline().split(" ");\n// Your code here`,
      rust: `use std::io;\nfn main() {\n  let mut input = String::new();\n  io::stdin().read_line(&mut input).unwrap();\n  let tokens: Vec<&str> = input.trim().split_whitespace().collect();\n  // Your code here\n}`,
      csharp: `using System;\nusing System.Collections.Generic;\nclass Program {\n  static void Main() {\n    var tokens = Console.ReadLine().Split(' ');\n    // Your code here\n  }\n}`,
    },
  },
  {
    id: 15,
    title: "Rotate Matrix 90 Degrees",
    difficulty: "hard",
    description: `Given a square matrix of size n×n, rotate it 90 degrees clockwise in-place.`,
    examples: [
      { input: "2\n1 2\n3 4", output: "3 1\n4 2" },
      { input: "3\n1 2 3\n4 5 6\n7 8 9", output: "7 4 1\n8 5 2\n9 6 3" },
    ],
    testCases: [
      { input: "2\n1 2\n3 4", output: "3 1\n4 2" },
      { input: "3\n1 2 3\n4 5 6\n7 8 9", output: "7 4 1\n8 5 2\n9 6 3" },
      { input: "1\n42", output: "42" },
      { input: "2\n9 1\n6 5", output: "6 9\n5 1" },
      { input: "4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16", output: "13 9 5 1\n14 10 6 2\n15 11 7 3\n16 12 8 4" },
    ],
    starterCode: {
      python: `n = int(input())\nmatrix = [list(map(int, input().split())) for _ in range(n)]\n# Your code here`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n  int n; cin >> n;\n  vector<vector<int>> mat(n, vector<int>(n));\n  for(int i=0;i<n;i++) for(int j=0;j<n;j++) cin >> mat[i][j];\n  // Your code here\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int n = sc.nextInt();\n    int[][] mat = new int[n][n];\n    for(int i=0;i<n;i++) for(int j=0;j<n;j++) mat[i][j] = sc.nextInt();\n    // Your code here\n  }\n}`,
      javascript: `const n = parseInt(readline());\nlet mat = [];\nfor (let i = 0; i < n; i++) mat.push(readline().split(" ").map(Number));\n// Your code here`,
      rust: `use std::io;\nfn main() {\n  let mut line = String::new();\n  io::stdin().read_line(&mut line).unwrap();\n  let n: usize = line.trim().parse().unwrap();\n  let mut mat = vec![];\n  for _ in 0..n {\n    line.clear();\n    io::stdin().read_line(&mut line).unwrap();\n    let row: Vec<i32> = line.trim().split_whitespace().map(|x| x.parse().unwrap()).collect();\n    mat.push(row);\n  }\n  // Your code here\n}`,
      csharp: `using System;\nclass Program {\n  static void Main() {\n    int n = int.Parse(Console.ReadLine());\n    int[,] mat = new int[n, n];\n    for (int i = 0; i < n; i++) {\n      var row = Console.ReadLine().Split(' ');\n      for (int j = 0; j < n; j++) mat[i, j] = int.Parse(row[j]);\n    }\n    // Your code here\n  }\n}`,
    },
  },
  {
    id: 16,
    title: "Longest Unique Substring",
    difficulty: "hard",
    description: `Given a string, return the length of the longest substring without repeating characters.`,
    examples: [
      { input: "abcabcbb", output: "3" },
      { input: "bbbbb", output: "1" }
    ],
    testCases: [
      { input: "abcabcbb", output: "3" },
      { input: "bbbbb", output: "1" },
      { input: "pwwkew", output: "3" },
      { input: "dvdf", output: "3" },
      { input: "abcdef", output: "6" }
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
  {
    id: 17,
    title: "Next Greater Element",
    difficulty: "hard",
    description: `For each element in the array, find the next greater element. If no such element exists, output -1.`,
    examples: [
      { input: "4\n4 5 2 10", output: "5 10 10 -1" },
      { input: "3\n3 2 1", output: "-1 -1 -1" }
    ],
    testCases: [
      { input: "4\n4 5 2 10", output: "5 10 10 -1" },
      { input: "3\n3 2 1", output: "-1 -1 -1" },
      { input: "5\n1 3 2 4 1", output: "3 4 4 -1 -1" },
      { input: "1\n42", output: "-1" },
      { input: "6\n5 4 3 2 1 6", output: "6 6 6 6 6 -1" }
    ],
    starterCode: {
      python: `n = int(input())\narr = list(map(int, input().split()))\n# Your code here`,
      cpp: `#include <iostream>\n#include <stack>\nusing namespace std;\nint main() {\n  int n;\n  cin >> n;\n  int arr[n];\n  for(int i=0;i<n;i++) cin >> arr[i];\n  // Your code here\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int n = sc.nextInt();\n    int[] arr = new int[n];\n    for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n    // Your code here\n  }\n}`,
      javascript: `const n = parseInt(readline());\nconst arr = readline().split(" ").map(Number);\n// Your code here`,
      rust: `use std::io;\nfn main() {\n  let mut buf = String::new();\n  io::stdin().read_line(&mut buf).unwrap();\n  let n: usize = buf.trim().parse().unwrap();\n  buf.clear();\n  io::stdin().read_line(&mut buf).unwrap();\n  let arr: Vec<i32> = buf.trim().split_whitespace().map(|x| x.parse().unwrap()).collect();\n  // Your code here\n}`,
      csharp: `using System;\nclass Program {\n  static void Main() {\n    int n = int.Parse(Console.ReadLine());\n    var arr = Array.ConvertAll(Console.ReadLine().Split(), int.Parse);\n    // Your code here\n  }\n}`,
    },
  },
  {
    id: 18,
    title: "Valid Parentheses",
    difficulty: "hard",
    description: `Given a string containing only the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. A string is valid if every opening bracket has a corresponding closing bracket in the correct order.`,
    examples: [
      { input: "()[]{}", output: "true" },
      { input: "([)]", output: "false" }
    ],
    testCases: [
      { input: "()[]{}", output: "true" },
      { input: "([)]", output: "false" },
      { input: "{[]}", output: "true" },
      { input: "(", output: "false" },
      { input: "([])", output: "true" }
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
  {
    id: 19,
    title: "Digit Sum Equalizer",
    difficulty: "extreme",
    description: `Given a positive integer N, find the smallest number greater than N such that the sum of its digits is equal to the sum of the digits of N.`,
    examples: [
      { input: "19", output: "28" },
      { input: "123", output: "132" }
    ],
    testCases: [
      { input: "19", output: "28" },
      { input: "123", output: "132" },
      { input: "5", output: "14" },
      { input: "99", output: "108" },
      { input: "100", output: "109" }
    ],
    starterCode: {
      python: `n = int(input())\n# Your code here`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n  int n;\n  cin >> n;\n  // Your code here\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int n = sc.nextInt();\n    // Your code here\n  }\n}`,
      javascript: `const n = parseInt(readline());\n// Your code here`,
      rust: ``,
      csharp: ``
    }
  },
  {
    id: 20,
    title: "Max Subarray XOR",
    difficulty: "extreme",
    description: `Given an array of integers, find the maximum XOR value of any subarray.`,
    examples: [
      { input: "3\n1 2 3", output: "3" },
      { input: "4\n8 1 2 12", output: "15" }
    ],
    testCases: [
      { input: "3\n1 2 3", output: "3" },
      { input: "4\n8 1 2 12", output: "15" },
      { input: "5\n4 6 7 8 9", output: "15" },
      { input: "2\n5 1", output: "5" },
      { input: "3\n0 0 0", output: "0" }
    ],
    starterCode: {
      python: `n = int(input())\narr = list(map(int, input().split()))\n# Your code here`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n  int n, x;\n  cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; ++i) cin >> arr[i];\n  // Your code here\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int n = sc.nextInt();\n    int[] arr = new int[n];\n    for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n    // Your code here\n  }\n}`,
      javascript: `const n = parseInt(readline());\nconst arr = readline().split(" ").map(Number);\n// Your code here`,
      rust: ``,
      csharp: ``
    }
  },
  {
    id: 21,
    title: "Lexicographically Smallest Rotation",
    difficulty: "extreme",
    description: `Given a string S, return its lexicographically smallest rotation.`,
    examples: [
      { input: "bca", output: "abc" },
      { input: "aaa", output: "aaa" }
    ],
    testCases: [
      { input: "bca", output: "abc" },
      { input: "aaaaa", output: "aaaaa" },
      { input: "cba", output: "acb" },
      { input: "helloworld", output: "dhelloworl" },
      { input: "rotation", output: "ationrot" }
    ],
    starterCode: {
      python: `s = input()\n# Your code here`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n  string s;\n  cin >> s;\n  // Your code here\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    String s = sc.next();\n    // Your code here\n  }\n}`,
      javascript: `const s = readline();\n// Your code here`,
      rust: ``,
      csharp: ``
    }
  },
  {
    id: 22,
    title: "Largest Rectangle in Histogram",
    difficulty: "extreme",
    description: `Given an array representing the heights of bars in a histogram, find the area of the largest rectangle that can be formed.`,
    examples: [
      { input: "6\n2 1 5 6 2 3", output: "10" },
      { input: "1\n2", output: "2" }
    ],
    testCases: [
      { input: "6\n2 1 5 6 2 3", output: "10" },
      { input: "1\n2", output: "2" },
      { input: "7\n6 2 5 4 5 1 6", output: "12" },
      { input: "4\n2 4 2 1", output: "6" },
      { input: "3\n2 1 2", output: "3" }
    ],
    starterCode: {
      python: `n = int(input())\nheights = list(map(int, input().split()))\n# Your code here`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n  int n;\n  cin >> n;\n  int h[n];\n  for (int i = 0; i < n; ++i) cin >> h[i];\n  // Your code here\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int n = sc.nextInt();\n    int[] h = new int[n];\n    for (int i = 0; i < n; i++) h[i] = sc.nextInt();\n    // Your code here\n  }\n}`,
      javascript: `const n = parseInt(readline());\nconst h = readline().split(" ").map(Number);\n// Your code here`,
      rust: ``,
      csharp: ``
    }
  },
  {
    id: 23,
    title: "Shortest Unique Substring",
    difficulty: "extreme",
    description: `Given a string S, return the shortest substring that occurs only once in the string. If multiple exist, return the lexicographically smallest.`,
    examples: [
      { input: "abcab", output: "c" },
      { input: "abac", output: "b" }
    ],
    testCases: [
      { input: "abcab", output: "c" },
      { input: "abac", output: "b" },
      { input: "aaaaa", output: "aaaaa" },
      { input: "xyz", output: "x" },
      { input: "aabbaacc", output: "b" }
    ],
    starterCode: {
      python: `s = input()\n# Your code here`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n  string s;\n  cin >> s;\n  // Your code here\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    String s = sc.next();\n    // Your code here\n  }\n}`,
      javascript: `const s = readline();\n// Your code here`,
      rust: ``,
      csharp: ``
    }
  },
  {
    id: 24,
    title: "Remove K Digits",
    difficulty: "extreme",
    description: `You are given a non-negative integer num represented as a string and an integer k. Remove exactly k digits from the number so that the new number is the smallest possible. Return the result as a string.
  
  Note:
  - The result should not contain leading zeros unless the number is "0".
  - It is guaranteed that k < length of num.`,
    examples: [
      { input: "1432219 3", output: "1219" },
      { input: "10200 1", output: "200" }
    ],
    testCases: [
      { input: "1432219 3", output: "1219" },
      { input: "10200 1", output: "200" },
      { input: "10 2", output: "0" },
      { input: "1234567890 9", output: "0" },
      { input: "1111111 3", output: "1111" }
    ],
    starterCode: {
      python: `s, k = input().split()\nk = int(k)\n# Your code here`,
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n  string s;\n  int k;\n  cin >> s >> k;\n  // Your code here\n}`,
      java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    String s = sc.next();\n    int k = sc.nextInt();\n    // Your code here\n  }\n}`,
      javascript: `const [s, kStr] = readline().split(" ");\nconst k = parseInt(kStr);\n// Your code here`,
      rust: `use std::io;\nfn main() {\n  let mut input = String::new();\n  io::stdin().read_line(&mut input).unwrap();\n  let parts: Vec<&str> = input.trim().split_whitespace().collect();\n  let s = parts[0];\n  let k: usize = parts[1].parse().unwrap();\n  // Your code here\n}`,
      csharp: `using System;\nclass Program {\n  static void Main() {\n    var parts = Console.ReadLine().Split(' ');\n    string s = parts[0];\n    int k = int.Parse(parts[1]);\n    // Your code here\n  }\n}`
    }
  }
];