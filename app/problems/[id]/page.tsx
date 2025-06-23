// app/problems/[id]/page.tsx
'use client';

import { useParams, useRouter } from "next/navigation";
import { problems } from "@/lib/problems";
import { useEffect, useState } from "react";
import CodeEditor from "@/components/problem/CodeEditor";
import { PistonLanguage, sendCodeToPiston } from "@/lib/piston";
import { useTeam } from "@/lib/TeamContext";
import Navbar from "@/components/ui/navbar";

const languageOptions: PistonLanguage[] = [
  "python", "cpp", "java", "javascript", "rust", "csharp"
];

export default function ProblemPage() {
  const { id } = useParams();
  const router = useRouter();
  const { team } = useTeam();

  const [language, setLanguage] = useState<PistonLanguage>('python');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [starterCode, setStarterCode] = useState<string>('');

  const problem = problems.find(p => p.id === Number(id));

  useEffect(() => {
    if (!team) router.push("/team");
    else if ((problem?.difficulty === "hard" || problem?.difficulty === "extreme") && team.difficulty === "beginner") {
      router.push("/problems");
    }
  }, [team, problem, router]);

  useEffect(() => {
    if (problem?.starterCode) {
      setStarterCode(problem.starterCode[language] || '');
    }
  }, [language, problem]);

  if (!problem) return <div className="text-white p-6">Problem not found.</div>;

  const handleResult = async (code: string) => {
    const input = problem.examples[0]?.input || "";
    const expected = problem.examples[0]?.output.trim();

    const result = await sendCodeToPiston(language, code, input);
    const output = result.output.trim();

    const isCorrect = output === expected;
    setFeedback(isCorrect ? "Correct! 🎉" : `Incorrect ❌\nOutput: ${output}`);
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
        <p className="text-zinc-400 text-sm mb-6">Difficulty: {problem.difficulty}</p>

        <div className="mb-6">
          <h2 className="font-semibold mb-1">Description</h2>
          <p className="text-sm text-zinc-300 whitespace-pre-wrap">{problem.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-1">Examples</h2>
          <ul className="text-sm text-zinc-300 space-y-2">
            {problem.examples.map((ex, i) => (
              <li key={i}>
                <pre className="bg-zinc-800 p-2 rounded-md">
                  <strong>Input:</strong> {ex.input}
                  <br />
                  <strong>Output:</strong> {ex.output}
                </pre>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm">Language</label>
          <select
            className="bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-md text-sm text-white"
            value={language}
            onChange={(e) => setLanguage(e.target.value as PistonLanguage)}
          >
            {languageOptions.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <CodeEditor
          language={language}
          starterCode={starterCode}
          onResult={handleResult}
        />

        {feedback && (
          <div className="mt-4 text-sm font-semibold whitespace-pre-wrap">
            {feedback}
          </div>
        )}
      </div>
    </main>
  );
}
