'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import Navbar from '@/components/ui/navbar';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const POINT_COUNT = 800;

function NetworkBackground() {
  const pointsRef = useRef<THREE.Points>(null);
  const lineRefs = useRef<THREE.Line[]>([]);
  const [positions, segments] = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const segments: [THREE.Vector3, THREE.Vector3][] = [];
    const size = 20;
    const gridCount = Math.sqrt(POINT_COUNT);
    const spacing = (size * 2) / gridCount;
    
    // Create grid of points
    for (let i = 0; i < POINT_COUNT; i++) {
      const x = Math.random() * size * 2 - size;
      const z = Math.random() * size * 2 - size;
      const y = Math.sin(x * 0.1 + z * 0.1) * 1;
      positions.push(new THREE.Vector3(x, y, z));
    }
    // Connect close points
    for (let i = 0; i < positions.length; i++)
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < spacing * 1.5)
          segments.push([positions[i], positions[j]]);
      }

    return [positions, segments] as const;
  }, []);

  const pointer = useThree((t) => t.mouse);
  const tempV = new THREE.Vector3();

  useFrame(() => {
    if (!pointsRef.current) return;

    const positionsBuffer = (pointsRef.current.geometry.attributes.position as any).array;
    for (let i = 0; i < positions.length; i++) {
      const v = positions[i];
      const idx = i * 3;
      
      // Original position + wiggle
      const baseX = v.x;
      const baseY = v.y;
      const baseZ = v.z;
      const wiggle = Math.sin(performance.now() * 0.001 + i) * 0.02;
      let mvX = baseX + wiggle;
      let mvY = baseY + wiggle * 0.5;
      let mvZ = baseZ;

      // Attract to mouse
      tempV.set(pointer.x * window.innerWidth / 50, pointer.y * window.innerHeight / 50, 0);
      const dist = tempV.distanceTo(v);
      if (dist < 5) {
        const strength = (1 - dist / 5) * 0.05;
        mvX += (pointer.x * window.innerWidth / 100 - v.x) * strength;
        mvY += (pointer.y * window.innerHeight / 100 - v.y) * strength;
      }

      positionsBuffer[idx] = mvX;
      positionsBuffer[idx + 1] = mvY;
      positionsBuffer[idx + 2] = mvZ;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update line geometry
    lineRefs.current.forEach((l, idx) => {
      const [a, b] = segments[idx];
      (l.geometry as THREE.BufferGeometry).setFromPoints([a, b]);
    });
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length}
            array={new Float32Array(positions.flatMap(p => p.toArray()))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00bfff"
          size={0.14}
          sizeAttenuation
          transparent
          depthWrite={false}
        />
      </points>

      {segments.map((seg, i) => (
        <line
          key={i}
          ref={(el: any) => (lineRefs.current[i] = el)}
        >
          <bufferGeometry attach="geometry" />
          <lineBasicMaterial
            color="#00bfff"
            transparent
            opacity={0.05}
          />
        </line>
      ))}
    </>
  );
}

export default function HomePage() {
  return (
    <main className="relative bg-black text-white min-h-screen flex flex-col overflow-hidden">
      <Navbar />

      <Canvas
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        camera={{ position: [0, 10, 25], fov: 60 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <EffectComposer>
          <Bloom intensity={2.0} luminanceThreshold={0} luminanceSmoothing={0.9} />
        </EffectComposer>
        <NetworkBackground />
      </Canvas>

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