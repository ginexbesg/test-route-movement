// src/ThreeCanvas.js
import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const coordinates = [
  { x: 0, y: 0, z: 0 },
  { x: 1, y: 1, z: 0 },
  { x: 2, y: 0, z: 0 },
  { x: 3, y: 1, z: 0 },
];

const CirclesAndLines = () => {
  const linesRef = useRef();

  useEffect(() => {
    const points = coordinates.map(
      (coord) => new THREE.Vector3(coord.x, coord.y, coord.z)
    );
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    linesRef.current.geometry = lineGeometry;
  }, []);

  return (
    <>
      {coordinates.map((coord, index) => (
        <mesh key={index} position={[coord.x, coord.y, coord.z]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="red" />
        </mesh>
      ))}
      <line ref={linesRef}>
        <lineBasicMaterial color="blue" />
      </line>
    </>
  );
};

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <CirclesAndLines />
    </Canvas>
  );
};

const ThreeCanvas = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Scene />
    </div>
  );
};

export default ThreeCanvas;
