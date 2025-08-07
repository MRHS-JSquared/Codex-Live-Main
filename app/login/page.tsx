'use client';

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { login } = useAuth(); // now uses Supabase under the hood
  const router = useRouter();
  const [error, setError] = useState("");


  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const success = await login(email, password); // now async
    if (success === "unverified") {
      setError("Invalid Credentials (If you have not verified your email please do so)");
    } else if (success === true) {
      router.push("/team");
    } else {
      setError("Invalid Credentials (If you have not verified your email please do so)");
    }
  };

  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-grow flex items-center justify-center px-6 py-12 bg-gradient-to-br from-black via-zinc-900 to-black">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-zinc-900/70 border border-zinc-800 rounded-2xl shadow-xl p-10 w-full max-w-md backdrop-blur-md"
        >
          <h1 className="text-3xl font-bold mb-6 text-center tracking-tight">
            Log in to <span className="text-blue-500">CodeX</span>
          </h1>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />

            <Button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg"
            >
              Log In
            </Button>
          </form>

          <p className="mt-4 text-xs text-zinc-500 text-center">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-blue-500 hover:underline transition"
            >
              Sign up
            </a>
          </p>
        </motion.div>
      </section>
    </main>
  );
}