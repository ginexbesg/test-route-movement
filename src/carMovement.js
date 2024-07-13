// src/ThreeCanvas.js
import React, { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Plane } from "@react-three/drei";
import * as THREE from "three";

// Define the polygon as an array of coordinates
const polygonCoordinates = [
  { x: -5, y: -5, z: 0 },
  { x: 5, y: -5, z: 0 },
  { x: 5, y: 5, z: 0 },
  { x: -5, y: 5, z: 0 },
];

// Define the robot movement path inside the polygon
const robotPath = [
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
  { x: 0, y: -1, z: 0 },
  { x: 1, y: -1, z: 0 },
  { x: 2, y: -1, z: 0 },
  { x: 3, y: -1, z: 0 },
  { x: 4, y: -1, z: 0 },
  { x: 5, y: -1, z: 0 },
  { x: 6, y: -1, z: 0 },
  { x: 7, y: -1, z: 0 },
  { x: 8, y: -1, z: 0 },
  { x: 9, y: -1, z: 0 },
  { x: 9, y: -2, z: 0 },
  { x: 8, y: -2, z: 0 },
  { x: 7, y: -2, z: 0 },
  { x: 6, y: -2, z: 0 },
  { x: 5, y: -2, z: 0 },
  { x: 4, y: -2, z: 0 },
  { x: 3, y: -2, z: 0 },
  { x: 2, y: -2, z: 0 },
  { x: 1, y: -2, z: 0 },
  { x: 0, y: -2, z: 0 },
];

const Polygon = ({ coordinates, color }) => {
  const lineRef = useRef();

  useEffect(() => {
    const points = coordinates.map(
      (coord) => new THREE.Vector3(coord.x, coord.y, coord.z)
    );
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    lineRef.current.geometry = lineGeometry;
  }, [coordinates]);

  return (
    <line ref={lineRef}>
      <lineBasicMaterial color={color} />
    </line>
  );
};

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

const Car = ({ path, speed }) => {
  const carRef = useRef();
  const carTexture = useLoader(THREE.TextureLoader, "/car.png"); // Replace with your car image path

  const points = useMemo(
    () => path.map((p) => new THREE.Vector3(p.x, p.y, p.z)),
    [path]
  );
  let progress = 0;

  useFrame(() => {
    if (carRef.current) {
      const pointIndex = Math.floor(progress);
      const nextPointIndex = (pointIndex + 1) % points.length;
      const currentPoint = points[pointIndex];
      const nextPoint = points[nextPointIndex];
      carRef.current.position.lerpVectors(
        currentPoint,
        nextPoint,
        progress - pointIndex
      );

      progress += speed;
      if (progress >= points.length) progress = 0;
    }
  });

  return (
    <mesh ref={carRef}>
      <planeGeometry args={[0.5, 0.5]} />
      <meshBasicMaterial map={carTexture} transparent />
    </mesh>
  );
};

const CirclesAndLines = () => {
  return (
    <>
      <Polygon coordinates={polygonCoordinates} color="black" />
      <Route coordinates={robotPath} color="blue" />
      <Car path={robotPath} speed={0.0005} />
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
