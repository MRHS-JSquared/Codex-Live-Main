export type PistonLanguage = 'python' | 'cpp' | 'java' | 'javascript' | 'csharp' | 'rust';

const LANGUAGE_MAP: Record<PistonLanguage, string> = {
  python: 'python3',
  cpp: 'cpp',
  java: 'java',
  javascript: 'javascript',
  csharp: 'csharp',
  rust: 'rust',
};

export async function sendCodeToPiston(
  language: PistonLanguage,
  code: string,
  input: string = ''
): Promise<{ output: string; success: boolean }> {
  try {
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: LANGUAGE_MAP[language],
        source: code,
        stdin: input,
      }),
    });

    const data = await response.json();

    const output = [data.compile_output, data.run?.output]
      .filter(Boolean)
      .join('\n')
      .trim();

    const success = !data.run?.stderr && data.run?.code === 0;

    return { output, success };
  } catch (error: any) {
    return { output: `Error: ${error.message}`, success: false };
  }
}