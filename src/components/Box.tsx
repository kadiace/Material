/* eslint-disable react/no-unknown-property */
import { MeshProps, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function Box(props: MeshProps) {
  /* eslint-disable */
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta;
  });

  return (
    <mesh
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      {...props}
    >
      <octahedronGeometry args={[1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default Box;
