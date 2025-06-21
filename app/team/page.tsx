'use client';

import Navbar from "@/components/ui/navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTeam } from "@/lib/TeamContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";

export default function TeamPage() {
  const { createTeam, joinTeam, team } = useTeam();
  const { user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) router.push("/login");
    else if (team) router.push("/team/dashboard");

  }, [user, team, router]);

  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = form.teamName.value.trim();
    const difficulty = form.difficulty.value;

    if (!(name && difficulty)) {
        setError("Please fill in all fields.");
        return;
    }

    const success = createTeam(name, difficulty);
    if (!success) {
        setError("Team with that name already exists")
    } else {
        router.push("/team/dashboard");
    }
  };

  const handleSubmitJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const code = form.accessCode.value.trim();

    if (!code) {
        setError("Please enter a valid access code.");
        return;
    }

    const success = joinTeam(code);
    if (!success) {
        setError("Code is invalid");
    } else {
        router.push("/team/dashboard");
    }
  };
  
  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold mb-2"
        >
          Join or Create a Team
        </motion.h1>

        <p className="text-zinc-400 mb-6 text-sm text-center">
          You need to be part of a team to participate in the competition
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-6 text-center">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Create Team Form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-1">Create New Team</h2>
            <p className="text-sm text-zinc-400 mb-6">
              Start your own team and become the leader
            </p>
            <form className="space-y-4" onSubmit={handleSubmitCreate}>
              <input
                type="text"
                name="teamName"
                placeholder="Team Name"
                required
                className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-md text-sm placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <select
                name="difficulty"
                required
                className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-md text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select difficulty level
                </option>
                <option value="beginner">Beginner</option>
                <option value="advanced">Advanced</option>
              </select>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                Create Team
              </Button>
            </form>
          </motion.div>

          {/* Join Team Form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-1">Join Existing Team</h2>
            <p className="text-sm text-zinc-400 mb-6">
              Enter the 6-character access code from your team leader
            </p>
            <form className="space-y-4" onSubmit={handleSubmitJoin}>
              <input
                type="text"
                name="accessCode"
                placeholder="Access Code"
                required
                className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-md text-sm placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Button className="w-full bg-zinc-100 text-black hover:bg-white rounded-md">
                Join Team
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}