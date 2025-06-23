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
  onResult: (code: string) => Promise<void>;
}) {
  const [code, setCode] = useState(starterCode);
  const [loading, setLoading] = useState(false);

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
        onChange={(e) => setCode(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Running...' : 'Submit'}
      </Button>
    </div>
  );
}