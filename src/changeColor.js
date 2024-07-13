import React, { useEffect, useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";

import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const polygonCoordinates = [
  { x: -10, y: -5, z: 0 },
  { x: 10, y: -5, z: 0 },
  { x: 10, y: 5, z: 0 },
  { x: -10, y: 5, z: 0 },
];

const robotPath = [
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

  { x: 9, y: -1, z: 0 },
  { x: 8, y: -1, z: 0 },
  { x: 7, y: -1, z: 0 },
  { x: 6, y: -1, z: 0 },
  { x: 5, y: -1, z: 0 },
  { x: 4, y: -1, z: 0 },
  { x: 3, y: -1, z: 0 },
  { x: 2, y: -1, z: 0 },
  { x: 1, y: -1, z: 0 },
  { x: 0, y: -1, z: 0 },

  { x: 0, y: -2, z: 0 },
  { x: 1, y: -2, z: 0 },
  { x: 2, y: -2, z: 0 },
  { x: 3, y: -2, z: 0 },
  { x: 4, y: -2, z: 0 },
  { x: 5, y: -2, z: 0 },
  { x: 6, y: -2, z: 0 },
  { x: 7, y: -2, z: 0 },
  { x: 8, y: -2, z: 0 },
  { x: 9, y: -2, z: 0 },
  { x: 9, y: -3, z: 0 },
  { x: 8, y: -3, z: 0 },
  { x: 7, y: -3, z: 0 },
  { x: 6, y: -3, z: 0 },
  { x: 5, y: -3, z: 0 },
  { x: 4, y: -3, z: 0 },
  { x: 3, y: -3, z: 0 },
  { x: 2, y: -3, z: 0 },
  { x: 1, y: -3, z: 0 },
  { x: 0, y: -3, z: 0 },
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

const Route = ({ coordinates, color, passedIndices }) => {
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
          <meshBasicMaterial
            color={passedIndices.has(index) ? "green" : color}
          />
        </mesh>
      ))}
      <line ref={lineRef}>
        <lineBasicMaterial color={color} />
      </line>
    </>
  );
};
const Car = ({ path, speed, onPassIndex }) => {
  const carRef = useRef();
  const carTexture = useLoader(THREE.TextureLoader, "/car.png");

  const [passedIndices, setPassedIndices] = useState(new Set());

  const points = useMemo(
    () => path.map((p) => new THREE.Vector3(p.x, p.y, p.z)),
    [path]
  );

  let progress = 0;
  const framesPerSecond = 60;
  const progressIncrementPerFrame = speed / framesPerSecond;

  useFrame(() => {
    if (carRef.current) {
      const currentPointIndex = Math.floor(progress);
      const nextPointIndex = (currentPointIndex + 1) % points.length;

      const currentPoint = points[currentPointIndex];
      const nextPoint = points[nextPointIndex];

      // Move the car along the path
      carRef.current.position.lerpVectors(
        currentPoint,
        nextPoint,
        progress % 1
      );

      // Check if the car has reached or passed the next point
      if (progress >= currentPointIndex + 1) {
        const passedIndex = currentPointIndex % points.length;
        if (!passedIndices.has(passedIndex)) {
          setPassedIndices((prevIndices) =>
            new Set(prevIndices).add(passedIndex)
          );
          onPassIndex(passedIndex); // Notify parent component about passing this index
        }
      }

      // Increment progress based on speed
      progress += progressIncrementPerFrame;

      // Ensure progress stays within bounds
      if (progress >= points.length) {
        progress -= points.length;
      }
    }
  });

  return (
    <mesh ref={carRef}>
      <planeGeometry args={[0.5, 0.5]} />
      <meshBasicMaterial map={carTexture} transparent />
    </mesh>
  );
};

// const Car = ({ path, speed, onPassIndex }) => {
//   const carRef = useRef();
//   const carTexture = useLoader(THREE.TextureLoader, "/car.png");

//   //   const [passedIndices, setPassedIndices] = useState([]);

//   const points = useMemo(
//     () => path.map((p) => new THREE.Vector3(p.x, p.y, p.z)),
//     [path]
//   );

//   let progress = 0;
//   const framesPerSecond = 60;
//   const progressIncrementPerFrame = 1 / (framesPerSecond * speed);

//   useFrame(() => {
//     if (carRef.current) {
//       const pointIndex = Math.floor(progress);
//       const nextPointIndex = (pointIndex + 1) % points.length;
//       const currentPoint = points[pointIndex];
//       const nextPoint = points[nextPointIndex];
//       carRef.current.position.lerpVectors(
//         currentPoint,
//         nextPoint,
//         progress - pointIndex
//       );

//       progress += progressIncrementPerFrame;
//       onPassIndex(pointIndex); // Notify parent component about passing an index
//       if (progress >= points.length) {
//         progress = 0;
//         onPassIndex(pointIndex); // Notify parent component about passing an index
//       }
//     }
//   });

//   return (
//     <mesh ref={carRef}>
//       <planeGeometry args={[0.5, 0.5]} />
//       <meshBasicMaterial map={carTexture} transparent />
//     </mesh>
//   );
// };
const CirclesAndLines = () => {
  const [passedIndices, setPassedIndices] = useState(new Set());

  const handlePassIndex = (index) => {
    setPassedIndices((prevIndices) => new Set(prevIndices).add(index));
  };

  return (
    <>
      <Route
        coordinates={robotPath}
        color="blue"
        passedIndices={passedIndices}
      />
      <Car path={robotPath} speed={0.25} onPassIndex={handlePassIndex} />
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
