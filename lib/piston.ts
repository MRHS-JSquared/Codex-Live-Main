export type PistonLanguage = 'python' | 'cpp' | 'java' | 'javascript' | 'csharp' | 'rust';

const LANGUAGE_MAP: Record<PistonLanguage, string> = {
  python: 'python3',
  cpp: 'cpp',
  java: 'java',
  javascript: 'javascript',
  csharp: 'csharp',
  rust: 'rust',
};

type PistonResponse = {
  compile_output?: string | null;
  run: {
    stdout?: string;
    stderr?: string;
    output?: string;
    code: number;
  };
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Piston API error:", response.status, errorText);
      return { output: `Error: ${response.status} ${response.statusText}`, success: false };
    }

    const data: PistonResponse = await response.json();

    const combinedOutput = [
      data.compile_output,
      data.run?.output,
      data.run?.stdout,
    ]
      .filter(Boolean)
      .join('\n')
      .trim();

    const hasError = !!data.run?.stderr || data.run?.code !== 0;

    console.log("⚙️ Full Piston response:", data);

    return {
      output: combinedOutput || data.run?.stderr || 'No output',
      success: !hasError,
    };
  } catch (error: any) {
    console.error("❌ Network or fetch error:", error);
    return { output: `Error: ${error.message}`, success: false };
  }
}