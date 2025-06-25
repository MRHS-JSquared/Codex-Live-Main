'use client';

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, Line } from '@react-three/drei';

const GRID_SIZE = 20;
const SPACING = 1.5;

export default function GridScene() {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const positions = useMemo(() => {
    const temp: number[] = [];
    for (let x = -GRID_SIZE; x <= GRID_SIZE; x++) {
      for (let y = -GRID_SIZE; y <= GRID_SIZE; y++) {
        temp.push(x * SPACING, y * SPACING, 0);
      }
    }
    return new Float32Array(temp);
  }, []);

  const lines = useMemo(() => {
    const temp: [THREE.Vector3, THREE.Vector3][] = [];
    for (let x = -GRID_SIZE; x < GRID_SIZE; x++) {
      for (let y = -GRID_SIZE; y < GRID_SIZE; y++) {
        const p1 = new THREE.Vector3(x * SPACING, y * SPACING, 0);
        const p2 = new THREE.Vector3((x + 1) * SPACING, y * SPACING, 0);
        const p3 = new THREE.Vector3(x * SPACING, (y + 1) * SPACING, 0);
        temp.push([p1, p2]);
        temp.push([p1, p3]);
      }
    }
    return temp;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const dx = x / (GRID_SIZE * SPACING) - mouse.x;
      const dy = y / (GRID_SIZE * SPACING) - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const z = Math.exp(-dist * 5) * 2;
      positions.setZ(i, z);
    }
    positions.needsUpdate = true;
  });

  return (
    <>
      {/* Glowing Grid Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00ffff"
          size={0.5}
          sizeAttenuation
          transparent
          opacity={1}
        />
      </points>

      {/* Grid Lines */}
      {lines.map(([start, end], i) => (
        <Line
          key={i}
          points={[start, end]}
          color="#00ffff"
          lineWidth={1}
          transparent
          opacity={0.5}
          derivatives={100}
        />
      ))}
    </>
  );
}