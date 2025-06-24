'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useTeam } from '@/lib/TeamContext';
import Navbar from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';

export default function HackathonPage() {
  const { user } = useAuth();
  const { team, setTeam } = useTeam();
  const router = useRouter();

  const [repoLink, setRepoLink] = useState('');

  useEffect(() => {
    if (!user) router.push('/login');
    else if (!team) router.push('/team');
  }, [user, team, router]);

  const handleSubmit = () => {
    if (!team) return;
    if (!repoLink.trim()) return alert('Please enter your GitHub repo link.');

    const confirm = window.confirm("Are you sure you want to submit this GitHub repo for your hackathon project? This cannot be changed.");

    if (!confirm) return;

    const updatedTeam = {
      ...team,
      hackathonRepo: repoLink
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

    setTeam(updatedTeam);
    alert("✅ Hackathon project submitted!");
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <section className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">🏆 Hackathon Submission</h1>
        <p className="text-zinc-400 mb-6">
          Submit your hackathon project here. You will need to provide a **public GitHub repository link** that contains all code and documentation for your project.
        </p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Submission Guidelines</h2>
          <ul className="list-disc pl-6 text-sm text-zinc-400 space-y-2 mb-6">
            <li>Your repository must be public.</li>
            <li>Include a README with clear instructions and description of your project.</li>
            <li>Only one submission per team is allowed.</li>
          </ul>

          <label className="block mb-2 text-sm font-medium text-white">GitHub Repository Link</label>
          <input
            type="url"
            value={repoLink}
            onChange={(e) => setRepoLink(e.target.value)}
            className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 mb-4 text-sm"
            placeholder="https://github.com/your-team/hackathon-project"
          />

          <Button
            onClick={handleSubmit}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {'Submit Hackathon'}
          </Button>
        </div>
      </section>
    </main>
  );
}