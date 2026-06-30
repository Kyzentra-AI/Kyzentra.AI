import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSphere({ mousePosition }) {
  const pointsRef = useRef();
  const count = 1000;

  // Generate particle positions on a sphere
  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const init = [];
    const radius = 2.2;

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      init.push({ x, y, z, originalRadius: radius, speed: 0.1 + Math.random() * 0.4 });
    }
    return [pos, init];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    
    // Convert current mouse position to 3D sphere coordinate targets
    const targetX = (mousePosition.current.x * 2.0);
    const targetY = (mousePosition.current.y * 2.0);
    
    // Slow overall rotation
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = time * 0.03;
    
    // Dynamic floating translation
    pointsRef.current.position.y = Math.sin(time * 0.5) * 0.15;
    pointsRef.current.position.x = Math.cos(time * 0.4) * 0.08;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const init = initialPositions[i];
      
      // Multi-frequency wave deformation (organic pulsating brain effect)
      const wave = Math.sin(time * 1.2 * init.speed + init.x * 2) * 0.08 + 
                   Math.cos(time * 0.8 * init.speed + init.y * 2) * 0.08;
      const currentRadius = init.originalRadius + wave;
      
      // Calculate current base position of the particle
      let x = (init.x / init.originalRadius) * currentRadius;
      let y = (init.y / init.originalRadius) * currentRadius;
      let z = (init.z / init.originalRadius) * currentRadius;

      // Pointer deflection calculations (interactive deformation)
      const dx = x - targetX;
      const dy = y - targetY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 1.5) {
        // Push particles away slightly based on proximity
        const force = (1.5 - distance) * 0.25;
        x += dx * force;
        y += dy * force;
      }

      positionsAttr.array[i3] = x;
      positionsAttr.array[i3 + 1] = y;
      positionsAttr.array[i3 + 2] = z;
    }

    positionsAttr.needsUpdate = true;
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.065}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.7}
        />
      </Points>
      {/* Secondary glow core */}
      <mesh>
        <sphereGeometry args={[1.3, 16, 16]} />
        <meshBasicMaterial 
          color="#8b5cf6" 
          wireframe 
          transparent 
          opacity={0.05} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function AISphere() {
  const mousePosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    // Standardize mouse coordinates between -1 and 1
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    mousePosition.current = { x, y };
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} color="#06b6d4" intensity={1} />
        
        <ParticleSphere mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
