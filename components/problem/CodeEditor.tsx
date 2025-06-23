'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { PistonLanguage, sendCodeToPiston } from '@/lib/piston';

export default function CodeEditor({
  language,
  starterCode,
  onResult,
}: {
  language: PistonLanguage;
  starterCode: string;
  onResult: (output: string, success: boolean) => void;
}) {
  const [code, setCode] = useState(starterCode);
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    const result = await sendCodeToPiston(language, code);
    setLoading(false);
    onResult(result.output, result.success);
  };

  return (
    <div className="flex flex-col gap-4">
      <textarea
        className="w-full h-64 p-3 bg-zinc-900 border border-zinc-700 rounded-md text-sm text-white font-mono resize-none"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button onClick={runCode} disabled={loading}>
        {loading ? 'Running...' : 'Submit'}
      </Button>
    </div>
  );
}