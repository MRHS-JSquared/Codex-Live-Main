'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { PistonLanguage } from '@/lib/piston';

export default function CodeEditor({
  language,
  starterCode,
  onResult,
  onCodeChange,
}: {
  language: PistonLanguage;
  starterCode: string;
  onResult: (code: string) => Promise<void>;
  onCodeChange?: (code: string) => void;
}) {
  const [code, setCode] = useState(starterCode);
  const [loading, setLoading] = useState(false);

  // Update code editor content when starterCode changes (e.g. language switch)
  useEffect(() => {
    setCode(starterCode);
  }, [starterCode]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    if (onCodeChange) onCodeChange(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onResult(code);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <textarea
        className="w-full h-64 p-3 bg-zinc-900 border border-zinc-700 rounded-md text-sm text-white font-mono resize-none"
        value={code}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Running...' : 'Submit'}
      </Button>
    </div>
  );
}