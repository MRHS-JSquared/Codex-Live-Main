'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/navbar';
import * as THREE from 'three';

function generateJaggedLine(start: THREE.Vector3, end: THREE.Vector3, segments: number, amplitude: number) {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = THREE.MathUtils.lerp(start.x, end.x, t);
    const z = THREE.MathUtils.lerp(start.z, end.z, t);
    const y = (Math.random() - 0.5) * amplitude;
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
}

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
    renderer.setClearColor(0x000000, 0);

    const flatGridSize = 30;
    const flatDivisions = 30;
    const flatSpacing = flatGridSize / flatDivisions;
    const half = flatGridSize / 2;

    const flatLineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#00ffff'),
      transparent: true,
      opacity: 0.15,
    });

    const jaggedLineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#ffffff'),
      transparent: true,
      opacity: 0.2,
    });

    const pointMaterial = new THREE.PointsMaterial({
      color: '#00ffff',
      size: 0.05,
      transparent: true,
      opacity: 1.0,
    });

    const pointGeometry = new THREE.BufferGeometry();
    const pointPositions: number[] = [];

    // Flat grid (floor)
    for (let i = -half; i <= half; i += flatSpacing) {
      const hPoints = [new THREE.Vector3(i, 0, -half), new THREE.Vector3(i, 0, half)];
      const hGeom = new THREE.BufferGeometry().setFromPoints(hPoints);
      scene.add(new THREE.Line(hGeom, flatLineMaterial));

      const vPoints = [new THREE.Vector3(-half, 0, i), new THREE.Vector3(half, 0, i)];
      const vGeom = new THREE.BufferGeometry().setFromPoints(vPoints);
      scene.add(new THREE.Line(vGeom, flatLineMaterial));

      // Points at intersections
      for (let j = -half; j <= half; j += flatSpacing) {
        pointPositions.push(i, 0.01, j); // slightly raised for visibility
      }
    }

    pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pointPositions, 3));
    const glowingPoints = new THREE.Points(pointGeometry, pointMaterial);
    scene.add(glowingPoints);

    // Jagged elevated grid (very wide spaced)
    const jaggedSpacing = 3;
    const jaggedSegments = 20;
    const amplitude = 3;

    for (let i = -half; i <= half; i += jaggedSpacing) {
      const hPoints = generateJaggedLine(
        new THREE.Vector3(i, 10, -half),
        new THREE.Vector3(i, 10, half),
        jaggedSegments,
        amplitude
      );
      const hGeom = new THREE.BufferGeometry().setFromPoints(hPoints);
      scene.add(new THREE.Line(hGeom, jaggedLineMaterial));

      const vPoints = generateJaggedLine(
        new THREE.Vector3(-half, 10, i),
        new THREE.Vector3(half, 10, i),
        jaggedSegments,
        amplitude
      );
      const vGeom = new THREE.BufferGeometry().setFromPoints(vPoints);
      scene.add(new THREE.Line(vGeom, jaggedLineMaterial));
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

      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      />

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