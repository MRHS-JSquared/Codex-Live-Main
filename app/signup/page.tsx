'use client';

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";

export default function SignupPage() {
  const { signup, user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    const success = signup(email, password);
    if (!success) {
      setError("An account with that email already exists.");
    } else {
      router.push("/");
    }
  };

  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />

      <section className="flex flex-col items-center justify-center text-center flex-grow px-6 py-20">
        <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-sm space-y-4"
        >
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none"
            required
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            Create Account
          </Button>
        </form>
      </section>
    </main>
  );
}