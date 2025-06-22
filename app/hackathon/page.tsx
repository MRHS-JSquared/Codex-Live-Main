'use client';

import Navbar from "@/components/ui/navbar";
import { motion } from "framer-motion";

export default function Hackathon() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-grow flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4">
            Hackathon
          </h1>
          <p className="text-zinc-400 text-lg">Coming Soon...</p>
        </motion.div>
      </section>
    </main>
  );
}