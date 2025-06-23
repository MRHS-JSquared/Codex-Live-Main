export type PistonLanguage = 'python' | 'cpp' | 'java' | 'javascript' | 'csharp' | 'rust';

const LANGUAGE_MAP: Record<PistonLanguage, string> = {
  python: 'python3',
  cpp: 'cpp',
  java: 'java',
  javascript: 'javascript',
  csharp: 'csharp',
  rust: 'rust',
};

function getFileName(language: PistonLanguage): string {
  switch (language) {
    case 'python': return 'main.py';
    case 'cpp': return 'main.cpp';
    case 'java': return 'Main.java';
    case 'javascript': return 'main.js';
    case 'csharp': return 'Main.cs';
    case 'rust': return 'main.rs';
    default: return 'main.txt';
  }
}

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
        version: '*',
        files: [
          {
            name: getFileName(language),
            content: code,
          },
        ],
        stdin: input,
      }),
    });

    const data = await response.json();
    console.log("Piston API result:", data); // DEBUG LOG

    const output = [data.compile?.output, data.run?.output, data.run?.stderr]
      .filter(Boolean)
      .join('\n')
      .trim();

    const success = !data.run?.stderr && data.run?.code === 0;

    return { output, success };
  } catch (error: any) {
    console.error("Piston API error:", error);
    return { output: `Error: ${error.message}`, success: false };
  }
}