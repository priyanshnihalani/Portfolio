import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Sphere, Ring } from "@react-three/drei";

const planets = [
  { name: "Mercury", size: 0.5, posX: 8, texture: "mercury.jpg" },
  { name: "Venus", size: 0.8, posX: 12, texture: "venus.jpg" },
  { name: "Earth", size: 1.0, posX: 16, texture: "earth.jpg" },
  { name: "Mars", size: 0.9, posX: 20, texture: "mars.jpg" },
  { name: "Jupiter", size: 2.5, posX: 26, texture: "jupiter.jpg" },
  { name: "Saturn", size: 2.0, posX: 34, texture: "saturn.jpg" },
  { name: "Uranus", size: 1.5, posX: 40, texture: "uranus.jpg" },
  { name: "Neptune", size: 1.4, posX: 46, texture: "neptune.jpeg" },
];

const Planets = () => {
  const textureLoader = useLoader(TextureLoader, planets.map(p => `/textures/${p.texture}`));

  return (
    <>
      {planets.map((planet, i) => (
        <group key={planet.name} position={[planet.posX, 0, 0]}>
          <Sphere args={[planet.size, 32, 32]}>
            <meshStandardMaterial map={textureLoader[i]} />
          </Sphere>
        </group>
      ))}
    </>
  );
};

export default Planets;
