'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { problems } from '@/lib/problems';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useTeam } from '@/lib/TeamContext';
import CodeEditor from '@/components/problem/CodeEditor';
import Navbar from '@/components/ui/navbar';
import { PistonLanguage } from '@/lib/piston';

export default function ProblemPage() {
  const { id } = useParams();
  const problemId = parseInt(id as string);
  const problem = problems.find((p) => p.id === problemId);
  const { user } = useAuth();
  const { team } = useTeam();
  const router = useRouter();

  const [output, setOutput] = useState('');
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) router.push('/login');
    else if (!team) router.push('/team');
    else if (
      (problem?.difficulty === 'hard' || problem?.difficulty === 'extreme') &&
      team.difficulty !== 'advanced'
    ) {
      router.push('/problems');
    }
  }, [user, team, problem, router]);

  if (!problem) return <div className="text-white">Problem not found.</div>;

  const handleResult = (out: string, passed: boolean) => {
    setOutput(out);
    setSuccess(passed);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
        <p className="text-zinc-300 mb-6 whitespace-pre-wrap">{problem.description}</p>

        <h2 className="text-lg font-semibold mb-2">Example Input</h2>
        <pre className="bg-zinc-900 p-3 rounded text-sm mb-4 whitespace-pre-wrap">
          {problem.examples[0].input}
        </pre>

        <h2 className="text-lg font-semibold mb-2">Expected Output</h2>
        <pre className="bg-zinc-900 p-3 rounded text-sm mb-6 whitespace-pre-wrap">
          {problem.examples[0].output}
        </pre>

        <CodeEditor
          language={"python" as PistonLanguage} // You can add a language selector later
          starterCode={problem.starterCode?.python || ''}
          onResult={handleResult}
        />

        {output && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Output</h2>
            <pre className="bg-zinc-900 p-3 rounded text-sm whitespace-pre-wrap">{output}</pre>
            <p className={`mt-2 font-semibold ${success ? 'text-green-400' : 'text-red-400'}`}>
              {success ? 'All test cases passed!' : 'Some test cases failed.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
