'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';

function Grid() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef(new THREE.Vector2());

  // Grid config
  const spacing = 2;
  const gridSize = 10;

  const points: THREE.Vector3[] = [];
  for (let x = -gridSize; x <= gridSize; x++) {
    for (let y = -gridSize; y <= gridSize; y++) {
      points.push(new THREE.Vector3(x * spacing, y * spacing, 0));
    }
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
  
    group.children.forEach((point) => {
      if (point instanceof THREE.Mesh && point.material instanceof THREE.MeshBasicMaterial) {
        const dist = point.position.distanceTo(
          new THREE.Vector3(mouse.current.x * 20, mouse.current.y * 10, 0)
        );
        const scale = 1.5 - dist / 15;
        const clamped = Math.max(0.5, Math.min(2, scale));
        point.scale.set(clamped, clamped, clamped);
  
        point.material.color.setHSL(0.6, 1, Math.max(0.4, 1.5 - dist / 10));
      }
    });
  });

  return (
    <group ref={groupRef}>
      {points.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>
      ))}
    </group>
  );
}

function BackgroundScene() {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: '100px', // start below navbar
        left: 0,
        zIndex: 0,
      }}
      camera={{ position: [0, 0, 30], fov: 75 }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, 10]} intensity={1.5} />
      <Grid />
    </Canvas>
  );
}

export default function HomePage() {
  return (
    <main className="relative bg-black text-white min-h-screen overflow-hidden">
      <Navbar />

      {/* 3D Background */}
      <BackgroundScene />

      {/* Foreground UI */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-40 pb-24">
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
          The ultimate competitive programming platform.<br />
          Code, compete, and conquer challenging algorithms.
        </p>

        <Button className="mt-8 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 text-lg rounded-xl">
          Join CodeX
        </Button>
      </section>
    </main>
  );
}