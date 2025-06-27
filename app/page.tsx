'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import Navbar from '@/components/ui/navbar';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const POINT_COUNT = 900;

function NetworkBackground() {
  const pointsRef = useRef<THREE.Points>(null);
  const lineRefs = useRef<THREE.Line[]>([]);
  const { size, mouse, viewport } = useThree();

  const [positions, segments] = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const segments: [THREE.Vector3, THREE.Vector3][] = [];
    const radius = 25;

    for (let i = 0; i < POINT_COUNT; i++) {
      const x = (Math.random() - 0.5) * radius * 2;
      const y = (Math.random() - 0.5) * radius * 1.5;
      const z = (Math.random() - 0.5) * radius * 2;
      positions.push(new THREE.Vector3(x, y, z));
    }

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < 3.5) {
          segments.push([positions[i], positions[j]]);
        }
      }
    }

    return [positions, segments] as const;
  }, []);

  const tempV = new THREE.Vector3();

  useFrame(() => {
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < positions.length; i++) {
      const base = positions[i];
      const index = i * 3;

      // Base wiggle
      const wiggle = Math.sin(performance.now() * 0.001 + i) * 0.05;
      let x = base.x + wiggle;
      let y = base.y + wiggle * 0.5;
      let z = base.z;

      // Cursor influence
      const pointer = new THREE.Vector3(mouse.x * viewport.width / 2, mouse.y * viewport.height / 2, 0);
      const dist = pointer.distanceTo(base);
      if (dist < 5) {
        const strength = (1 - dist / 5) * 0.2;
        x += (pointer.x - base.x) * strength;
        y += (pointer.y - base.y) * strength;
      }

      array[index] = x;
      array[index + 1] = y;
      array[index + 2] = z;
    }

    posAttr.needsUpdate = true;

    // Update connecting lines
    lineRefs.current.forEach((line, idx) => {
      const [a, b] = segments[idx];
      line.geometry.setFromPoints([a, b]);
    });
  });

  return (
    <>
      {/* Glowing Points */}
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
          size={0.18}
          sizeAttenuation
          transparent
          depthWrite={false}
        />
      </points>

      {/* Connecting Lines */}
      {segments.map(([start, end], index) => (
        <line key={index} ref={(el: any) => (lineRefs.current[index] = el)}>
          <bufferGeometry />
          <lineBasicMaterial
            color="#00bfff"
            transparent
            opacity={0.03}
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

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 35], fov: 60 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.5} />
          <EffectComposer>
            <Bloom intensity={2.2} luminanceThreshold={0} luminanceSmoothing={0.9} />
          </EffectComposer>
          <NetworkBackground />
        </Canvas>
      </div>

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