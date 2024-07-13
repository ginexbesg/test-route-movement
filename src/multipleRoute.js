// src/ThreeCanvas.js
import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Example routes, each route is an array of coordinates
const routes = [
  [
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 0, z: 0 },
    { x: 2, y: 0, z: 0 },
    { x: 3, y: 0, z: 0 },
    { x: 4, y: 0, z: 0 },
    { x: 5, y: 0, z: 0 },
    { x: 6, y: 0, z: 0 },
    { x: 7, y: 0, z: 0 },
    { x: 8, y: 0, z: 0 },
    { x: 9, y: 0, z: 0 },
    { x: 9, y: 1, z: 0 },
    { x: 8, y: 1, z: 0 },
    { x: 7, y: 1, z: 0 },
    { x: 6, y: 1, z: 0 },
    { x: 5, y: 1, z: 0 },
    { x: 4, y: 1, z: 0 },
    { x: 3, y: 1, z: 0 },
    { x: 2, y: 1, z: 0 },
    { x: 1, y: 1, z: 0 },
    { x: 0, y: 1, z: 0 },
  ],

  // Add more routes as needed
];

const Route = ({ coordinates, color }) => {
  const lineRef = useRef();

  useEffect(() => {
    const points = coordinates.map(
      (coord) => new THREE.Vector3(coord.x, coord.y, coord.z)
    );
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    lineRef.current.geometry = lineGeometry;
  }, [coordinates]);

  return (
    <>
      {coordinates.map((coord, index) => (
        <mesh key={index} position={[coord.x, coord.y, coord.z]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
      <line ref={lineRef}>
        <lineBasicMaterial color={color} />
      </line>
    </>
  );
};

const CirclesAndLines = () => {
  return (
    <>
      {routes.map((route, index) => (
        <Route
          key={index}
          coordinates={route}
          color={`hsl(${(index * 36) % 360}, 100%, 50%)`}
        />
      ))}
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
