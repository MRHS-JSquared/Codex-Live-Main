// Place this file at: /lib/solutions.ts

import { PistonLanguage } from "./piston";

export const solutions: Record<number, Partial<Record<PistonLanguage, string>>> = {
  1: {
    python: "a, b = map(int, input().split())\nprint(a + b)",
    cpp: "#include <iostream>\nusing namespace std;\nint main() { int a, b; cin >> a >> b; cout << a + b << endl; return 0; }",
    java: "import java.util.*; public class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); System.out.println(a + b); } }",
    javascript: "const [a, b] = readline().split(\" \".map(Number)); console.log(a + b);",
    rust: "use std::io; fn main() { let mut input = String::new(); io::stdin().read_line(&mut input).unwrap(); let nums: Vec<i32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect(); println!(\"{}\", nums[0] + nums[1]); }",
    csharp: "using System; class Program { static void Main() { var parts = Console.ReadLine().Split(' '); int a = int.Parse(parts[0]); int b = int.Parse(parts[1]); Console.WriteLine(a + b); } }"
  },
  2: {
    python: "s = input()\nprint(\"true\" if s == s[::-1] else \"false\")",
    cpp: "#include <iostream> using namespace std; int main() { string s; cin >> s; string r = s; reverse(r.begin(), r.end()); cout << (s == r ? \"true\" : \"false\"); return 0; }",
    java: "import java.util.*; public class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String s = sc.next(); String r = new StringBuilder(s).reverse().toString(); System.out.println(s.equals(r) ? \"true\" : \"false\"); } }",
    javascript: "const s = readline(); console.log(s === s.split('').reverse().join('') ? \"true\" : \"false\");",
    rust: "use std::io; fn main() { let mut s = String::new(); io::stdin().read_line(&mut s).unwrap(); let s = s.trim(); let rev: String = s.chars().rev().collect(); println!(\"{}\", if s == rev { \"true\" } else { \"false\" }); }",
    csharp: "using System; class Program { static void Main() { string s = Console.ReadLine(); char[] arr = s.ToCharArray(); Array.Reverse(arr); Console.WriteLine(s == new string(arr) ? \"true\" : \"false\"); } }"
  }
  // Add more problems/solutions as needed...
};
