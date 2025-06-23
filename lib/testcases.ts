export const testCases: Record<number, { input: string; output: string }[]> = {
    1: [
      { input: "4 6", output: "10" },
      { input: "-1 1", output: "0" },
      { input: "100 200", output: "300" },
      { input: "0 0", output: "0" },
      { input: "-50 -25", output: "-75" },
    ],
    2: [
      { input: "madam", output: "true" },
      { input: "step on no pets", output: "true" },
      { input: "robot", output: "false" },
      { input: "abcba", output: "true" },
      { input: "abc", output: "false" },
    ],
    // Add more test cases for ids 3–24
  };