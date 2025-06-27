'use client';

import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useMemo } from 'react';
import * as THREE from 'three';
import Navbar from '@/components/ui/navbar';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Line } from '@react-three/drei';

function NetworkBackground() {
  const gridSize = 30;
  const spacing = 3;
  const height = 0.8;

  const { points, lines } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const lines: [THREE.Vector3, THREE.Vector3][] = [];

    for (let x = -gridSize; x <= gridSize; x += spacing) {
      for (let z = -gridSize; z <= gridSize; z += spacing) {
        const y = Math.sin(x * 0.3) * 0.3 + Math.cos(z * 0.3) * 0.3;
        const point = new THREE.Vector3(x, y, z);
        points.push(point);
      }
    }

    // connect each point to right and bottom neighbors
    const rowLen = (gridSize * 2) / spacing + 1;
    for (let i = 0; i < points.length; i++) {
      const right = i + 1;
      const down = i + rowLen;
      if ((i + 1) % rowLen !== 0) lines.push([points[i], points[right]]);
      if (down < points.length) lines.push([points[i], points[down]]);
    }

    return { points, lines };
  }, []);

  return (
    <>
      {/* Glowing Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap(p => p.toArray()))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00bfff"
          size={0.25}
          sizeAttenuation
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connecting Lines */}
      {lines.map(([start, end], i) => (
        <Line
          key={i}
          points={[start, end]}
          color="#00bfff"
          transparent
          opacity={0.1}
          lineWidth={1}
        />
      ))}
    </>
  );
}

export default function HomePage() {
  return (
    <main className="relative bg-black text-white min-h-screen flex flex-col overflow-hidden">
      <Navbar />

      {/* Glowing Network Canvas */}
      <Canvas
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        camera={{ position: [0, 10, 35], fov: 60 }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.3} />
        <NetworkBackground />
        <EffectComposer>
          <Bloom intensity={1.6} luminanceThreshold={0} luminanceSmoothing={0.8} />
        </EffectComposer>
      </Canvas>

      {/* Foreground */}
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