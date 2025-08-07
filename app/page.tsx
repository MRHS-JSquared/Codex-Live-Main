'use client';

import Navbar from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat text-white flex flex-col overflow-hidden"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Navbar stays on top */}
      <Navbar />

      {/* Content */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center flex-grow px-6 py-20 backdrop-blur-sm bg-black/40">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold"
        >
          Code<span className="text-blue-500">X</span> 2025
        </motion.h1>

        <p className="mt-2 text-sm uppercase tracking-widest text-zinc-300">
          Competitive Developers
        </p>

        <p className="mt-6 text-zinc-300 text-lg max-w-xl">
          The ultimate competitive programming platform. Code, compete, and conquer challenging algorithms.
        </p>

        <Button className="mt-8 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 text-lg rounded-xl">
          <a href = "codexinfo.dev">Learn More</a>
        </Button>
      </section>
    </main>
  );
}