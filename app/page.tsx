'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import Navbar from '@/components/ui/navbar';
import { motion } from 'framer-motion';
import GridScene from '@/app/GridScene';

export default function HomePage() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col overflow-hidden">
      <Navbar />

      <section className="relative flex-grow">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <Suspense fallback={null}>
            <GridScene />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold"
          >
            Code<span className="text-blue-500">X</span> 2025
          </motion.h1>
          <p className="mt-2 text-sm uppercase tracking-widest text-zinc-400">
            Competitive Developers
          </p>
          <p className="mt-6 text-zinc-400 text-lg max-w-xl">
            The ultimate competitive programming platform. <br />
            Code, compete, and conquer challenging algorithms.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-lg font-semibold pointer-events-auto"
          >
            Join CodeX
          </motion.button>
        </div>
      </section>
    </main>
  );
}