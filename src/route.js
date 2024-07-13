import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Route = ({ coordinates, lineColor }) => {
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
      <lineBasicMaterial color={lineColor} />
    </line>
  );
};

export default Route;
