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

const Route = ({ coordinates, color, passedIndices }) => {
  const lineRef = useRef();
  const [currentPoint, setCurrentPoint] = useState(0);

  useEffect(() => {
    const remainingCoordinates = coordinates.filter(
      (_, index) =>
        !passedIndices.includes(index) && index !== coordinates.length - 1
    );

    if (lineRef.current) {
      if (remainingCoordinates.length > 0) {
        const points = remainingCoordinates.map(
          (coord) => new THREE.Vector3(coord.x, coord.y, coord.z)
        );
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        lineRef.current.geometry = lineGeometry;
        lineRef.current.material.color.set(color);
      } else {
        const points = coordinates.map(
          (coord) => new THREE.Vector3(coord.x, coord.y, coord.z)
        );
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        lineRef.current.geometry = lineGeometry;
        lineRef.current.material.color.set(color);
      }
    }
  }, [coordinates, passedIndices, color]);

  // Update the current point based on a set interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPoint((prevPoint) => (prevPoint + 1) % coordinates.length);
    }, 1000); // Adjust this interval as needed for speed

    return () => clearInterval(interval);
  }, [coordinates.length]);

  return (
    <>
      {coordinates.map(
        (coord, index) =>
          !passedIndices.includes(index) &&
          index !== coordinates.length - 1 && (
            <mesh key={index} position={[coord.x, coord.y, coord.z]}>
              <circleGeometry args={[0.1, 32]} />
              <meshBasicMaterial color={color} />
            </mesh>
          )
      )}
      {passedIndices.length !== coordinates.length - 1 && (
        <line ref={lineRef}>
          <lineBasicMaterial color={color} />
        </line>
      )}
      {!passedIndices.includes(coordinates.length - 1) && (
        <mesh
          key={coordinates.length - 1}
          position={[
            coordinates[coordinates.length - 1].x,
            coordinates[coordinates.length - 1].y,
            coordinates[coordinates.length - 1].z,
          ]}
        >
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color={color} />
        </mesh>
      )}
      <Html
        position={[
          coordinates[currentPoint].x,
          coordinates[currentPoint].y,
          coordinates[currentPoint].z,
        ]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img
            src={coordinates[currentPoint].cam_front}
            alt={`Point ${currentPoint} - Front`}
            style={{ width: "50px", height: "auto" }}
          />
          <img
            src={coordinates[currentPoint].cam_back}
            alt={`Point ${currentPoint} - Back`}
            style={{ width: "50px", height: "auto" }}
          />
          <img
            src={coordinates[currentPoint].cam_left}
            alt={`Point ${currentPoint} - Left`}
            style={{ width: "50px", height: "auto" }}
          />
          <img
            src={coordinates[currentPoint].cam_right}
            alt={`Point ${currentPoint} - Right`}
            style={{ width: "50px", height: "auto" }}
          />
        </div>
      </Html>
    </>
  );
};

const Car = ({ path, speed, onPassIndex, passedIndices }) => {
  const carRef = useRef();
  const carTexture = useLoader(THREE.TextureLoader, "/car.png");

  //   const [passedIndices, setPassedIndices] = useState([]);

  const points = useMemo(
    () => path.map((p) => new THREE.Vector3(p.x, p.y, p.z)),
    [path]
  );

  const framesPerSecond = 60;
  const progressIncrementPerFrame = 1 / (framesPerSecond * speed);
  const [progress, setProgress] = useState(0);

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
      passedIndices?.length !== points?.length &&
        pointIndex !== points.length - 1 &&
        setProgress(
          (prevProgress) =>
            (prevProgress + progressIncrementPerFrame) % points.length
        );
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
  const [passedIndices, setPassedIndices] = useState([]);

  const handlePassIndex = (index) => {
    if (!passedIndices.includes(index)) {
      setPassedIndices((prevIndices) => [...prevIndices, index]);
    }
  };

  return (
    <>
      <Polygon coordinates={polygonCoordinates} color="black" />
      <Route
        coordinates={robotPath}
        color="blue"
        passedIndices={passedIndices}
      />
      {
        <Car
          path={robotPath}
          speed={0.25} //0.25 means 1 second has four circle dot points
          onPassIndex={handlePassIndex}
          passedIndices={passedIndices}
        />
      }
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
