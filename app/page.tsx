'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/navbar';
import * as THREE from 'three';

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('#000000', 10, 50);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // transparent

    const gridSize = 30;
    const divisions = 30;
    const spacing = gridSize / divisions;
    const halfSize = gridSize / 2;
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#00ffff'),
      transparent: true,
      opacity: 0.2,
    });

    // Vertical lines
    for (let i = -halfSize; i <= halfSize; i += spacing) {
      const points = [];
      points.push(new THREE.Vector3(i, 0, -halfSize));
      points.push(new THREE.Vector3(i, 0, halfSize));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      scene.add(line);
    }

    // Horizontal lines
    for (let i = -halfSize; i <= halfSize; i += spacing) {
      const points = [];
      points.push(new THREE.Vector3(-halfSize, 0, i));
      points.push(new THREE.Vector3(halfSize, 0, i));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      scene.add(line);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <main className="relative bg-black text-white min-h-screen flex flex-col overflow-hidden">
      <Navbar />

      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      />

      {/* Foreground UI */}
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