'use client';

import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import Navbar from '@/components/ui/navbar';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

function LineSegment({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) {
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setFromPoints([start, end]);
    }
  }, [start, end]);

  return (
    <line>
      <bufferGeometry ref={geometryRef} />
      <lineBasicMaterial
        color="#00bfff"
        transparent
        opacity={0.05}
      />
    </line>
  );
}

function NetworkBackground() {
  const { positions, lineSegments } = useMemo(() => {
    const spacing = 2.5;
    const size = 20;
    const grid: THREE.Vector3[][] = [];
    const positions: THREE.Vector3[] = [];
    const lineSegments: [THREE.Vector3, THREE.Vector3][] = [];

    for (let x = -size; x <= size; x += spacing) {
      const row: THREE.Vector3[] = [];
      for (let z = -size; z <= size; z += spacing) {
        const y = Math.sin(x * 0.2 + z * 0.2) * 0.5;
        const point = new THREE.Vector3(x, y, z);
        row.push(point);
        positions.push(point);
      }
      grid.push(row);
    }

    grid.forEach((row, i) => {
      row.forEach((point, j) => {
        if (j < row.length - 1) lineSegments.push([point, row[j + 1]]);
        if (i < grid.length - 1) lineSegments.push([point, grid[i + 1][j]]);
      });
    });

    return { positions, lineSegments };
  }, []);

  return (
    <>
      {/* Glowing Points */}
      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={positions.length}
            array={new Float32Array(positions.flatMap(p => p.toArray()))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00bfff"
          size={0.15}
          sizeAttenuation
          transparent
          depthWrite={false}
        />
      </points>

      {/* Connecting Lines */}
      {lineSegments.map(([start, end], index) => (
        <LineSegment key={index} start={start} end={end} />
      ))}
    </>
  );
}

export default function HomePage() {
  return (
    <main className="relative bg-black text-white min-h-screen flex flex-col overflow-hidden">
      <Navbar />

      {/* 3D Canvas */}
      <Canvas
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        camera={{ position: [0, 10, 25], fov: 60 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.5} intensity={2.2} />
        </EffectComposer>
        <NetworkBackground />
      </Canvas>

      {/* Foreground content */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center flex-grow px-6 py-20">
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