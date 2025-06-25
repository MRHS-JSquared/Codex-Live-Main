'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/navbar';
import { motion } from 'framer-motion';

function GridPoints() {
  const ref = useRef<THREE.Points>(null);
  const count = 600;
  const radius = 3;
  const positions = new Float32Array(count * 3);

  // Create a grid of points
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / 30);
    const col = i % 30;
    positions[i * 3] = (col - 15) * 0.4;
    positions[i * 3 + 1] = (row - 10) * 0.4;
    positions[i * 3 + 2] = 0;
  }

  const mouse = { x: 0, y: 0 };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const positions = ref.current.geometry.attributes.position;
    const originalZ = 0;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      const dx = x - mouse.x * 10;
      const dy = y - mouse.y * 10;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const z = Math.max(Math.cos(dist * 1.5) * 1.5, originalZ);
      positions.setZ(i, z);
    }

    positions.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial color="#00ffff" size={0.08} sizeAttenuation depthWrite={false} transparent />
    </Points>
  );
}

export default function HomePage() {
  return (
    <main className="relative bg-black text-white min-h-screen flex flex-col overflow-hidden">
      <Navbar />

      {/* 3D Background Canvas */}
      <div className="absolute top-[120px] left-0 w-full h-[600px] -z-10">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <GridPoints />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <section className="flex flex-col items-center justify-center text-center flex-grow px-6 py-20 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold"
        >
          Code<span className="text-blue-500">X</span> 2025
        </motion.h1>

        <p className="mt-2 text-sm uppercase tracking-widest text-zinc-400">
          Competitive Developers
        </p>

        <p className="mt-6 text-zinc-400 text-lg max-w-xl">
          The ultimate competitive programming platform. Code, compete, and conquer challenging algorithms.
        </p>

        <Button className="mt-8 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 text-lg rounded-xl">
          Join CodeX
        </Button>
      </section>
    </main>
  );
}