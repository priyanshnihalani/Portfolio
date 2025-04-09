import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { usePlanet } from "./PlanetContext";

const planetPositions = {
  Mercury: [8, 10, 30],
  Venus: [12, 10, 30],
  Earth: [16, 10, 30],
  Mars: [20, 10, 30],
  Jupiter: [26, 10, 30],
  Saturn: [34, 10, 30],
  Uranus: [40, 10, 30],
  Neptune: [46, 10, 30],
};

const CameraControls = () => {
  const { camera } = useThree();
  const { targetPlanet } = usePlanet();

  useEffect(() => {
    if (targetPlanet && planetPositions[targetPlanet]) {
      const [x, y, z] = planetPositions[targetPlanet];
      camera.position.set(x, y, z);
      camera.lookAt(x, 0, 0);
    }
  }, [targetPlanet, camera]);

  return null;
};

export default CameraControls;
