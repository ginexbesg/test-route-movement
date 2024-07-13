import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Route from "./route"; // Assuming Route component is in a separate file

// Define the polygon as an array of coordinates
const polygonCoordinates = [
  { x: -10, y: -5, z: 0 },
  { x: 10, y: -5, z: 0 },
  { x: 10, y: 5, z: 0 },
  { x: -10, y: 5, z: 0 },
];

// Define the robot movement path inside the polygon
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

const CirclesAndLines = () => {
  return (
    <>
      {/* Render the polygon */}
      <Polygon coordinates={polygonCoordinates} color="black" />

      {/* Render the modified Route component with a different line color */}
      <Route coordinates={robotPath} lineColor="red" />

      {/* Render the Car component */}
      <Car path={robotPath} speed={0.25} />
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
