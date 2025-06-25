'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/navbar';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import gsap from 'gsap';

function createRoundTexture(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'white');
  gradient.addColorStop(1, 'transparent');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Postprocessing: Bloom
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 3.5, 1.5, 0.05);
    composer.addPass(bloomPass);

    // Particles
    const texture = createRoundTexture();
    const material = new THREE.PointsMaterial({
      size: 0.5,
      map: texture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      color: new THREE.Color('#00bfff'),
    });

    const numPoints = 600;
    const positions: number[] = [];
    const basePositions: THREE.Vector3[] = [];
    const currentPositions: THREE.Vector3[] = [];
    const wiggleOffsets: number[] = [];

    for (let i = 0; i < numPoints; i++) {
      const x = THREE.MathUtils.randFloatSpread(50);
      const y = THREE.MathUtils.randFloatSpread(30);
      const z = THREE.MathUtils.randFloatSpread(30);
      basePositions.push(new THREE.Vector3(x, y, z));
      currentPositions.push(new THREE.Vector3(x, y, z));
      wiggleOffsets.push(Math.random() * 100);
      positions.push(x, y, z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouse3D = new THREE.Vector3(0, 0, 0);

    let pointerActive = false;

    const animate = () => {
      requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      const posAttr = geometry.getAttribute('position');
      for (let i = 0; i < numPoints; i++) {
        const i3 = i * 3;
        const base = basePositions[i];
        const current = currentPositions[i];

        // Distance from cursor
        const dist = current.distanceTo(mouse3D);

        // Attraction logic
        if (pointerActive && dist < 6) {
          const direction = mouse3D.clone().sub(current).multiplyScalar(0.05);
          current.add(direction);
        } else {
          // Smooth return to base
          const returnDir = base.clone().sub(current).multiplyScalar(0.02);
          current.add(returnDir);
        }

        // Wiggle
        const wiggle = 0.3 * Math.sin(time * 2 + wiggleOffsets[i]);

        posAttr.setXYZ(i, current.x, current.y + wiggle, current.z);
      }

      posAttr.needsUpdate = true;
      composer.render();
    };
    animate();

    const onMouseMove = (e: MouseEvent) => {
      pointerActive = true;
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, mouse3D);
    };

    const onMouseLeave = () => {
      pointerActive = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseLeave);
    window.addEventListener('mouseleave', onMouseLeave);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <main className="relative bg-black text-white min-h-screen flex flex-col overflow-hidden">
      <Navbar />

      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      />

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