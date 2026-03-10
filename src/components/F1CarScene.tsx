import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function SpeedParticles({ count = 2000 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const z = Math.random() * 400 - 200;
      const radius = 10 + Math.random() * 40;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const speed = 2 + Math.random() * 5;
      const rand = Math.random();
      let colorHex = '#ffffff';
      if (rand > 0.95) colorHex = '#E10600'; // RBR Red
      else if (rand > 0.8) colorHex = '#FFC220'; // RBR Yellow
      else if (rand > 0.4) colorHex = '#06124B'; // RBR Navy Blue
      const color = new THREE.Color(colorHex);
      temp.push({ x, y, z, speed, color });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorArray = useMemo(() => {
    const arr = new Float32Array(count * 3);
    particles.forEach((p, i) => { p.color.toArray(arr, i * 3); });
    return arr;
  }, [particles, count]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    particles.forEach((p, i) => {
      p.z += p.speed;
      if (p.z > 50) p.z = -300;
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(0.1, 0.1, p.speed * 2);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </boxGeometry>
      <meshBasicMaterial toneMapped={false} vertexColors />
    </instancedMesh>
  );
}

export default function F1CarScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: '#020413' }}>
      <Canvas camera={{ position: [0, 0, 0], fov: 75, near: 0.1, far: 1000 }}>
        <fog attach="fog" args={['#020413', 10, 200]} />
        <SpeedParticles count={3000} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80" />
    </div>
  );
}
