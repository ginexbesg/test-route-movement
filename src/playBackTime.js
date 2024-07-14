import React, { useEffect, useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Html } from "@react-three/drei";
const polygonCoordinates = [
  { x: -10, y: -5, z: 0 },
  { x: 10, y: -5, z: 0 },
  { x: 10, y: 5, z: 0 },
  { x: -10, y: 5, z: 0 },
];

const robotPath = [
  {
    x: 9,
    y: 1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 8,
    y: 1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 7,
    y: 1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 6,
    y: 1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 5,
    y: 1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 4,
    y: 1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 3,
    y: 1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 2,
    y: 1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 1,
    y: 1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 0,
    y: 1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 0,
    y: 0,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 1,
    y: 0,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 2,
    y: 0,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 3,
    y: 0,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 4,
    y: 0,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 5,
    y: 0,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 6,
    y: 0,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 7,
    y: 0,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 8,
    y: 0,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 9,
    y: 0,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },

  {
    x: 9,
    y: -1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 8,
    y: -1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 7,
    y: -1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 6,
    y: -1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 5,
    y: -1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 4,
    y: -1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 3,
    y: -1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 2,
    y: -1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 1,
    y: -1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 0,
    y: -1,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },

  {
    x: 0,
    y: -2,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 1,
    y: -2,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 2,
    y: -2,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 3,
    y: -2,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 4,
    y: -2,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 5,
    y: -2,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 6,
    y: -2,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 7,
    y: -2,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 8,
    y: -2,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 9,
    y: -2,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 9,
    y: -3,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 8,
    y: -3,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 7,
    y: -3,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 6,
    y: -3,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 5,
    y: -3,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 4,
    y: -3,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 3,
    y: -3,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 2,
    y: -3,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 1,
    y: -3,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
  {
    x: 0,
    y: -3,
    z: 0,
    cam_front: "/front.png",
    cam_back: "/back.png",
    cam_left: "/left.png",
    cam_right: "/right.png",
  },
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

const Route = ({ coordinates, color, passedIndices, currentPoint }) => {
  const lineRef = useRef();

  useEffect(() => {
    // Calculate the range of points to display
    const startPoint = Math.min(currentPoint, coordinates.length - 1);
    const endPoint = Math.max(currentPoint, coordinates.length - 1);
    const visiblePoints = coordinates.slice(startPoint, endPoint + 1);
    // Update passed indices to exclude points in visible range
    const newPassedIndices = passedIndices.filter(
      (index) => index < startPoint
      //   || index > endPoint
    );
    const remainingCoordinates = visiblePoints.filter(
      (_, index) => !passedIndices.includes(index)
    );
    console.log("remaining...", remainingCoordinates);
    if (lineRef.current) {
      const points = coordinates
        .filter((eachCor, index) => {
          return (
            !passedIndices.includes(index) &&
            index >= Math.min(currentPoint, coordinates.length - 1) &&
            index <= Math.max(currentPoint, coordinates.length - 1)
          );
        })
        .map((coord) => new THREE.Vector3(coord.x, coord.y, coord.z));
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      lineRef.current.geometry = lineGeometry;
      lineRef.current.material.color.set(color);
    }

    // Update passedIndices outside of this effect if needed
    // (e.g., using a state setter from the parent component)
  }, [coordinates, passedIndices, currentPoint, color]);

  return (
    <>
      {coordinates.map((coord, index) => {
        const isVisible =
          !passedIndices.includes(index) &&
          index >= Math.min(currentPoint, coordinates.length - 1) &&
          index <= Math.max(currentPoint, coordinates.length - 1);
        return (
          <mesh
            key={index}
            position={[coord.x, coord.y, coord.z]}
            visible={isVisible}
          >
            <circleGeometry args={[0.1, 32]} />
            <meshBasicMaterial color={color} />
          </mesh>
        );
      })}
      <line ref={lineRef}>
        <lineBasicMaterial color={color} />
      </line>
    </>
  );
};

const Car = ({ path, speed, onPassIndex, passedIndices, currentPoint }) => {
  const carRef = useRef();
  const carTexture = useLoader(THREE.TextureLoader, "/car.png");

  const points = useMemo(
    () => path.map((p) => new THREE.Vector3(p.x, p.y, p.z)),
    [path]
  );

  const framesPerSecond = 60;
  const progressIncrementPerFrame = 1 / (framesPerSecond * speed);
  const [progress, setProgress] = useState(currentPoint || 0);

  useFrame(() => {
    if (carRef.current) {
      const pointIndex = Math.floor(progress) % points.length;
      const nextPointIndex = (pointIndex + 1) % points.length;
      const currentPoint = points[pointIndex];
      const nextPoint = points[nextPointIndex];

      carRef.current.position.lerpVectors(
        currentPoint,
        nextPoint,
        progress - pointIndex
      );

      // Check if the car has passed the current point index
      if (
        Math.floor(progress) !==
        Math.floor(progress + progressIncrementPerFrame)
      ) {
        onPassIndex(pointIndex); // Notify parent component about passing an index
      }

      // Increment progress based on speed
      if (
        passedIndices?.length !== points?.length &&
        pointIndex !== points.length - 1
      ) {
        setProgress(
          (prevProgress) =>
            (prevProgress + progressIncrementPerFrame) % points.length
        );
      }
    }
  });

  useEffect(() => {
    if (currentPoint !== undefined) {
      setProgress(currentPoint); // Reset progress when currentPoint changes
    }
  }, [currentPoint]);

  return (
    <mesh ref={carRef}>
      <planeGeometry args={[0.5, 0.5]} />
      <meshBasicMaterial map={carTexture} transparent />
    </mesh>
  );
};

const CirclesAndLines = () => {
  const [passedIndices, setPassedIndices] = useState([]);
  const [currentPoint, setCurrentPoint] = useState(0);

  const handlePassIndex = (index) => {
    if (!passedIndices.includes(index)) {
      setPassedIndices((prevIndices) => [...prevIndices, index]);
    }
  };

  const handlePointClick = (index) => {
    setCurrentPoint(index); // Update current point when clicking a timestamp

    // Remove indices from passedIndices in the range of the current point
    const rangeToRemove = Array.from(
      { length: Math.abs(currentPoint - index) },
      (_, i) => {
        return Math.min(currentPoint, index) + i; // Create array of indices in range
      }
    );
    console.log("passedIndices...", passedIndices);

    setPassedIndices((prev) => prev.filter((i) => rangeToRemove.includes(i)));
  };

  return (
    <>
      <Polygon coordinates={polygonCoordinates} color="black" />
      <Route
        coordinates={robotPath}
        color="blue"
        passedIndices={passedIndices}
        currentPoint={currentPoint} // Pass the current point
      />
      <Car
        path={robotPath}
        speed={0.25}
        onPassIndex={handlePassIndex}
        passedIndices={passedIndices}
        currentPoint={currentPoint}
      />
      {/* Buttons should be rendered in the React component tree, not in Three.js */}
      <Html position={[0, 0, 0]} style={{ pointerEvents: "auto", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          {robotPath.map((_, index) => (
            <button
              key={index}
              onClick={() => handlePointClick(index)}
              style={{ margin: "2px" }}
            >
              {`Go to Point ${index}`}
            </button>
          ))}
        </div>
      </Html>
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
