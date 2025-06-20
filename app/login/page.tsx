'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "@/components/ui/navbar";

export default function LoginPage() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />

      <section className="flex flex-col items-center justify-center text-center flex-grow px-6 py-20 bg-black">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold"
        >
          Code<span className="text-blue-500">X</span> 2025
        </motion.h1>

        <p className="mt-2 text-sm uppercase tracking-widest text-zinc-400">
          Competitive Developers
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Welcome Back</h2>
        <p className="text-zinc-400 mt-2">
          Sign in to continue your competitive programming journey
        </p>

        <form
          className="bg-zinc-900 border border-zinc-800 mt-10 w-full max-w-sm p-6 rounded-xl text-left shadow-md space-y-4"
        >
          <h3 className="text-lg font-medium text-white text-center">Sign In</h3>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-white">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2 text-sm rounded-md"
          >
            Sign In
          </Button>
        </form>
      </section>
    </main>
  );
}