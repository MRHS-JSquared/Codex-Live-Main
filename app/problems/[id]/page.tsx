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
  const { team, setTeam } = useTeam();

  const problemId = Number(id);
  const problem = problems.find(p => p.id === problemId);

  const [language, setLanguage] = useState<PistonLanguage>("python");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!team) {
      router.push("/team");
    } else if (
      (problem?.difficulty === "hard" || problem?.difficulty === "extreme") &&
      team.difficulty === "beginner"
    ) {
      router.push("/problems");
    }
  }, [team, problem, router]);

  if (!problem || !team) return <div className="text-white p-6">Problem not found or team missing.</div>;

  const handleRun = async (code: string) => {
    let allCorrect = true;

    for (let i = 0; i < problem.testCases.length; i++) {
      const test = problem.testCases[i];
      const result = await sendCodeToPiston(language, code, test.input);

      const output = result.output.trim();
      const expected = test.output.trim();

      console.log(`🧪 Test Case ${i + 1}`);
      console.log("📥 Input:", test.input);
      console.log("✅ Expected:", expected);
      console.log("📤 Output:", output);
      console.log("🔧 Raw Piston Result:", result);
      console.log("----------------------------------");

      if (output !== expected) {
        allCorrect = false;
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    if (allCorrect) {
      if (!team.solved.includes(problemId)) {
        const pointsEarned =
          problem.difficulty === "easy" ? 25 :
          problem.difficulty === "medium" ? 50 :
          problem.difficulty === "hard" ? 75 : 100;

        const updatedTeam = {
          ...team,
          points: [team.points[0] + pointsEarned, team.points[1]],
          solved: [...team.solved, problemId],
        };

        const allTeams = JSON.parse(localStorage.getItem("codex-teams") || "[]");
        const updatedTeams = allTeams.map((t: any) =>
          t.code === team.code ? updatedTeam : t
        );
        localStorage.setItem("codex-teams", JSON.stringify(updatedTeams));
        localStorage.setItem("codex-user", JSON.stringify({
          ...JSON.parse(localStorage.getItem("codex-user")!),
          teamCode: updatedTeam.code
        }));

        setFeedback("🎉 Problem solved! Awarded" + pointsEarned + "points.");
        console.log("🎉 Problem solved! Awarded", pointsEarned, "points.");
        setTeam(updatedTeam);
      } else {
        setFeedback("✅ Correct! Already solved.");
      }
    } else {
      setFeedback("❌ Incorrect. Try again.");
    }
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
          starterCode={problem.starterCode?.[language] || ''}
          onResult={handleRun}
        />

        {feedback && (
          <div className="mt-4 text-sm font-semibold">
            {feedback}
          </div>
        )}
      </div>
    </main>
  );
}