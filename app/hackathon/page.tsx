'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useTeam } from '@/lib/TeamContext';
import Navbar from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';

export default function HackathonPage() {
  const { user } = useAuth();
  const { team, setTeam } = useTeam();
  const router = useRouter();

  const [repoLink, setRepoLink] = useState('');

  useEffect(() => {
    if (!user) router.push('/login');
    else if (!team) router.push('/team');
    else if (team.hackathon) setRepoLink(team.hackathon); // preload if already submitted
  }, [user, team, router]);

  const handleSubmit = async () => {
    if (!team) return;
    if (!repoLink.trim()) {
      alert('Please enter your GitHub repo link.');
      return;
    }

    const confirmSubmit = window.confirm(
      "Are you sure you want to submit this GitHub repo for your hackathon project? This cannot be changed."
    );
    if (!confirmSubmit) return;

    const { data, error } = await supabase
      .from("teams")
      .update({ hackathon: repoLink })
      .eq("code", team.code)
      .select()
      .single();

    if (error) {
      console.error("Failed to submit hackathon project:", error.message);
      alert("❌ Submission failed. Please try again.");
      return;
    }

    const updatedTeam = { ...team, hackathon: repoLink };
    setTeam(updatedTeam);
    alert("✅ Hackathon project submitted!");
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <section className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">🏆 Hackathon Submission</h1>
        <p className="text-zinc-400 mb-6">
          Submit your hackathon project here. You will need to provide a <strong>public GitHub repository link</strong> that contains all code and documentation for your project.
        </p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Submission Guidelines</h2>
          <ul className="list-disc pl-6 text-sm text-zinc-400 space-y-2 mb-6">
            <li>Your repository must be public.</li>
            <li>Include a README with clear instructions and description of your project.</li>
            <li>Only one submission per team is allowed.</li>
          </ul>

          <label className="block mb-2 text-sm font-medium text-white">
            GitHub Repository Link
          </label>
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
            Submit Hackathon
          </Button>
        </div>
      </section>
    </main>
  );
}