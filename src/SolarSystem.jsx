import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import { usePlanet } from "./PlanetContext";

const SolarSystem = () => {
  const mountRef = useRef(null);
  const { targetPlanet } = usePlanet();
  const planetRefs = useRef({});
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animationRef = useRef(null);
  const [followMode, setFollowMode] = useState(true);

  // Debug reference to watch values
  const debugRef = useRef({
    lastTargetPlanet: null,
    currentAnimation: null
  });

  useEffect(() => {
    console.log("Main effect running, initializing scene");
    
    // === Scene Setup ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 30);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    if (mountRef.current) {
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      mountRef.current.appendChild(renderer.domElement);
    }

    // === Resize Handling ===
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // === Lights ===
    const pointLight = new THREE.PointLight(0xfff1b5, 50, 1000, 2);
    pointLight.position.set(0, 0, 0);
    pointLight.castShadow = true;
    scene.add(pointLight);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x222222, 0.5);
    scene.add(hemisphereLight);
    
    const fillLight = new THREE.DirectionalLight(0xfff1b5, 1.5);
    fillLight.position.set(-100, 50, 100);
    scene.add(fillLight);

    // === Sun ===
    const textureLoader = new THREE.TextureLoader();
    const loadTexture = (path) => {
      try {
        const texture = textureLoader.load(path);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        return texture;
      } catch (err) {
        console.error(`Failed to load texture: ${path}`, err);
        return null;
      }
    };

    const sunTexture = loadTexture("/textures/sun.jpg");
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(5, 64, 64),
      new THREE.MeshStandardMaterial({
        emissive: 0xffcc00,
        emissiveIntensity: 0.3,
        map: sunTexture,
      })
    );
    scene.add(sun);

    // === Stars ===
    const starsGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 1500; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }
    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // === Planet Factory ===
    const createPlanet = (name, size, texturePath, distance) => {
      try {
        const orbit = new THREE.Object3D();
        scene.add(orbit);
        
        const geometry = new THREE.SphereGeometry(size, 64, 64);
        const texture = loadTexture(texturePath);
        const material = new THREE.MeshStandardMaterial({ 
          map: texture 
        });
        
        const planet = new THREE.Mesh(geometry, material);
        planet.position.x = distance;
        orbit.add(planet);
        
        // Store both mesh and orbit in the ref
        planetRefs.current[name.toLowerCase()] = { 
          mesh: planet, 
          orbit: orbit,
          size: size,
          distance: distance 
        };
        
        console.log(`Created planet: ${name}`);
      } catch (err) {
        console.error(`Failed to create planet: ${name}`, err);
      }
    };

    const createOrbitPath = (radius) => {
      const curve = new THREE.RingGeometry(radius - 0.05, radius + 0.05, 64);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3,
      });
      const mesh = new THREE.Mesh(curve, mat);
      mesh.rotation.x = Math.PI / 2;
      scene.add(mesh);
    };

    // Create orbit paths
    [8, 12, 16, 20, 26, 34, 40, 46].forEach(createOrbitPath);

    // Create planets
    createPlanet("Mercury", 0.5, "/textures/mercury.jpg", 8);
    createPlanet("Venus", 0.9, "/textures/venus.jpg", 12);
    createPlanet("Earth", 1, "/textures/earth.jpg", 16);
    createPlanet("Mars", 0.8, "/textures/mars.jpg", 20);
    createPlanet("Jupiter", 2, "/textures/jupiter.jpg", 26);
    createPlanet("Saturn", 1.8, "/textures/saturn.jpg", 34);
    createPlanet("Uranus", 1.2, "/textures/uranus.jpg", 40);
    createPlanet("Neptune", 1.2, "/textures/neptune.jpeg", 46);

    // Log the created planets
    console.log("Planet references:", Object.keys(planetRefs.current));

    // === Moon ===
    try {
      if (planetRefs.current.earth && planetRefs.current.earth.mesh) {
        const moonOrbit = new THREE.Object3D();
        planetRefs.current.earth.mesh.add(moonOrbit);
        
        const moonTexture = loadTexture("/textures/moon.jpg");
        const moon = new THREE.Mesh(
          new THREE.SphereGeometry(0.3, 16, 16),
          new THREE.MeshStandardMaterial({ map: moonTexture })
        );
        moon.position.x = 2;
        moonOrbit.add(moon);
      }
    } catch (err) {
      console.error("Failed to create moon:", err);
    }

    // === Saturn Ring ===
    try {
      if (planetRefs.current.saturn && planetRefs.current.saturn.mesh) {
        const saturnRingTexture = loadTexture("/textures/saturnring.png");
        const saturnRing = new THREE.Mesh(
          new THREE.RingGeometry(2.5, 3.7, 64),
          new THREE.MeshBasicMaterial({
            map: saturnRingTexture,
            side: THREE.DoubleSide,
            transparent: true,
          })
        );
        saturnRing.rotation.x = Math.PI / 4;
        planetRefs.current.saturn.mesh.add(saturnRing);
      }
    } catch (err) {
      console.error("Failed to create Saturn ring:", err);
    }

    // === Controls ===
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.5;
    controls.autoRotate = false;
    controlsRef.current = controls;

    // === Animation ===
    const orbitSpeeds = {
      mercury: 0.015,
      venus: 0.012,
      earth: 0.01,
      mars: 0.008,
      jupiter: 0.006,
      saturn: 0.005,
      uranus: 0.004,
      neptune: 0.003,
    };

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
    
      // Rotate the sun
      sun.rotation.y += 0.002;
    
      // Update orbits and planets rotation
      Object.keys(orbitSpeeds).forEach((planet) => {
        const planetData = planetRefs.current[planet];
        if (planetData && planetData.orbit && planetData.mesh) {
          planetData.orbit.rotation.y += orbitSpeeds[planet];
          planetData.mesh.rotation.y += 0.01; // Planet's self-rotation
        }
      });
    
      // Handle camera following
      if (targetPlanet && planetRefs.current[targetPlanet.toLowerCase()]) {
        const planetData = planetRefs.current[targetPlanet.toLowerCase()];
        if (planetData && planetData.mesh && planetData.orbit) {
          // Get current world position of the planet
          const worldPos = new THREE.Vector3();
          planetData.mesh.getWorldPosition(worldPos);
          
          // Calculate appropriate camera distance based on planet size
          const planetSize = planetData.size;
          const distance = 5 + planetSize * 3;
          
          // Get the orbit angle to position camera diagonally behind and below
          const orbitAngle = planetData.orbit.rotation.y;
          
          // Offset to follow from a lower, behind-diagonal angle
          const offsetX = Math.sin(orbitAngle - Math.PI / 4) * distance;
          const offsetZ = Math.cos(orbitAngle - Math.PI / 4) * distance;
          const offsetY = -2 - planetSize; // Lower camera angle
          
          // Calculate target camera position
          const targetCamPos = new THREE.Vector3(
            worldPos.x + offsetX,
            worldPos.y + offsetY,
            worldPos.z + offsetZ
          );
          
          // Smoothly transition camera position
          if (camera.position) {
            camera.position.lerp(targetCamPos, 0.03);
    
            // Make the camera look slightly above the planet to avoid weird angles
            const lookAtPos = worldPos.clone();
            lookAtPos.y += 1.5 + planetSize;
            controls.target.lerp(lookAtPos, 0.05);
    
            controls.update();
          }
        }
      }
    
      controls.update();
      renderer.render(scene, camera);
    };
    
    
    animate();

    // Cleanup on unmount
    return () => {
      console.log("Cleaning up Three.js resources");
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Dispose of resources
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
      if (controls) controls.dispose();
    };
  }, []);

  // Handle planet selection changes
  useEffect(() => {
    console.log("Target planet changed to:", targetPlanet);
    
    if (!targetPlanet) {
      // Reset to default view when no planet is selected
      if (cameraRef.current && controlsRef.current) {
        const camera = cameraRef.current;
        const controls = controlsRef.current;
        
        // Animate back to default position
        const defaultPosition = new THREE.Vector3(0, 10, 30);
        const defaultTarget = new THREE.Vector3(0, 0, 0);
        
        let progress = 0;
        const duration = 60; // frames
        const startPos = camera.position.clone();
        const startTarget = controls.target.clone();
        
        const animateToDefault = () => {
          if (progress < 1) {
            progress += 1 / duration;
            
            // Interpolate position and target
            camera.position.lerpVectors(startPos, defaultPosition, progress);
            controls.target.lerpVectors(startTarget, defaultTarget, progress);
            controls.update();
            
            debugRef.current.currentAnimation = requestAnimationFrame(animateToDefault);
          } else {
            camera.position.copy(defaultPosition);
            controls.target.copy(defaultTarget);
            controls.update();
            debugRef.current.currentAnimation = null;
          }
        };
        
        // Cancel any existing animation
        if (debugRef.current.currentAnimation) {
          cancelAnimationFrame(debugRef.current.currentAnimation);
        }
        
        animateToDefault();
      }
      
      debugRef.current.lastTargetPlanet = null;
      return;
    }
    
    // Skip if selection hasn't changed
    if (debugRef.current.lastTargetPlanet === targetPlanet) {
      return;
    }
    
    debugRef.current.lastTargetPlanet = targetPlanet;
    
    const planetKey = targetPlanet.toLowerCase();
    const planetData = planetRefs.current[planetKey];
    
    if (planetData && planetData.mesh && cameraRef.current && controlsRef.current) {
      console.log(`Focusing on planet: ${targetPlanet}`);
      
      const worldPos = new THREE.Vector3();
      planetData.mesh.getWorldPosition(worldPos);
      
      // Get appropriate initial view position
      const planetSize = planetData.size;
      const distance = 5 + planetSize * 3;
      
      const initialCameraPos = new THREE.Vector3(
        worldPos.x + distance,
        worldPos.y + planetSize + 2,
        worldPos.z + distance
      );
      
      // Animate to new position
      const camera = cameraRef.current;
      const controls = controlsRef.current;
      
      let progress = 0;
      const duration = 60; // frames
      const startPos = camera.position.clone();
      const startTarget = controls.target.clone();
      
      const animateToTarget = () => {
        if (progress < 1) {
          progress += 1 / duration;
          
          // Interpolate position and target
          camera.position.lerpVectors(startPos, initialCameraPos, progress);
          controls.target.lerpVectors(startTarget, worldPos, progress);
          
          controls.update();
          
          debugRef.current.currentAnimation = requestAnimationFrame(animateToTarget);
        } else {
          camera.position.copy(initialCameraPos);
          controls.target.copy(worldPos);
          controls.update();
          debugRef.current.currentAnimation = null;
        }
      };
      
      // Cancel any existing animation
      if (debugRef.current.currentAnimation) {
        cancelAnimationFrame(debugRef.current.currentAnimation);
      }
      
      animateToTarget();
    }
  }, [targetPlanet]);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default SolarSystem;