'use client';

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

    // Lattice (points)
    const gridSize = 40;
    const spacing = 1;
    const pointsGeometry = new THREE.BufferGeometry();
    const positions: number[] = [];

    for (let x = -gridSize / 2; x < gridSize / 2; x++) {
      for (let y = -gridSize / 2; y < gridSize / 2; y++) {
        positions.push(x * spacing, y * spacing, 0);
      }
    }

    pointsGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const pointsMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#00bcd4'),
      size: 0.1,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // Optional: faint grid lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#0ff'),
      opacity: 0.05,
      transparent: true,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    for (let i = -gridSize / 2; i < gridSize / 2; i++) {
      linePositions.push(-gridSize / 2 * spacing, i * spacing, 0, gridSize / 2 * spacing, i * spacing, 0);
      linePositions.push(i * spacing, -gridSize / 2 * spacing, 0, i * spacing, gridSize / 2 * spacing, 0);
    }

    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    const animate = () => {
      raycaster.setFromCamera(mouse, camera);

      const positions = pointsGeometry.attributes.position;
      const numPoints = positions.count;

      for (let i = 0; i < numPoints; i++) {
        const vertex = new THREE.Vector3(
          positions.getX(i),
          positions.getY(i),
          positions.getZ(i)
        );

        const dist = raycaster.ray.origin.distanceTo(vertex);
        const z = Math.exp(-dist * 0.5) * 2;
        positions.setZ(i, z);
      }

      positions.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute w-full h-full top-[150px] pointer-events-none z-0"
    />
  );
}