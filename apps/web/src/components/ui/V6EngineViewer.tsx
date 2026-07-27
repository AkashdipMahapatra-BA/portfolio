"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

export function V6EngineViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 350;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(3.0, 2.2, 3.8);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. Enhanced Lighting & Reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 1.2);
    scene.add(hemiLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 3.0);
    mainLight.position.set(6, 12, 8);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x0ea5e9, 2.0); // Vibrant cyan rim light
    rimLight.position.set(-6, -4, -6);
    scene.add(rimLight);

    // Orange spotlight specifically aimed to illuminate the engraved name "AKASHDIP MAHAPATRA"
    const orangeSpotLight = new THREE.PointLight(0xf97316, 3.5, 12);
    orangeSpotLight.position.set(-3, 1, 4);
    scene.add(orangeSpotLight);

    // 5. Orbit Controls
    let controls: any = null;
    import("three-stdlib").then(({ OrbitControls }) => {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.2;
      controls.maxPolarAngle = Math.PI / 1.6;
      controls.minDistance = 1.2;
      controls.maxDistance = 8.0;
    });

    // 6. Materials matching SolidWorks colors exactly
    const pistonGoldMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#e29547"), // SolidWorks Piston Gold/Bronze
      metalness: 0.75,
      roughness: 0.25,
      envMapIntensity: 1.5,
    });

    const rodMagentaMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#c026d3"), // SolidWorks Connecting Rod Pink/Magenta
      metalness: 0.6,
      roughness: 0.3,
      envMapIntensity: 1.2,
    });

    const chromeCrankMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#f1f5f9"), // Polished Silver Chrome Crankshaft
      metalness: 0.92,
      roughness: 0.12,
      envMapIntensity: 2.0,
    });

    const pistonRingDarkMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1e293b"), // Dark Steel Piston Rings
      metalness: 0.85,
      roughness: 0.4,
    });

    const engravedTextPlateMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#cbd5e1"), // Aluminum flywheel base
      metalness: 0.85,
      roughness: 0.2,
      emissive: new THREE.Color("#ea580c"), // Warm orange glow on engraved text
      emissiveIntensity: 0.18,
    });

    // 7. Load GLB model & assign materials
    const loader = new GLTFLoader();
    loader.load(
      "/models/v6_engine.glb",
      (gltf) => {
        const model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.4 / maxDim;

        model.scale.set(scale, scale, scale);
        model.position.sub(center.multiplyScalar(scale));

        const meshes: THREE.Mesh[] = [];
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            meshes.push(mesh);
          }
        });

        // Smart color classification based on mesh bounds & names
        meshes.forEach((mesh) => {
          const meshBox = new THREE.Box3().setFromObject(mesh);
          const meshCenter = meshBox.getCenter(new THREE.Vector3());
          const meshSize = meshBox.getSize(new THREE.Vector3());
          const name = mesh.name.toLowerCase();

          // Check if mesh is near the end flywheel disk with engraved name
          const isFlywheelDisk = meshCenter.x < -0.8 || name.includes("akashdip") || name.includes("disk") || name.includes("plate");

          if (isFlywheelDisk) {
            mesh.material = engravedTextPlateMaterial;
          } else if (name.includes("ring") || (meshCenter.y > 0.45 && meshSize.y < 0.15)) {
            // Piston rings at the top
            mesh.material = pistonRingDarkMaterial;
          } else if (name.includes("piston") || meshCenter.y > 0.25) {
            // Piston heads
            mesh.material = pistonGoldMaterial;
          } else if (name.includes("rod") || (meshCenter.y <= 0.25 && meshCenter.y >= -0.3 && meshSize.y > 0.35)) {
            // Connecting rods
            mesh.material = rodMagentaMaterial;
          } else {
            // Crankshaft & counterweights
            mesh.material = chromeCrankMaterial;
          }
        });

        scene.add(model);
        setLoading(false);
      },
      undefined,
      (err) => {
        console.error("Error loading V6 Engine model:", err);
        setError("Unable to load 3D model");
        setLoading(false);
      }
    );

    // 8. Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (controls) controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "380px",
        borderRadius: "1rem",
        overflow: "hidden",
        background: "radial-gradient(circle at 50% 40%, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.95) 100%)",
        border: "1px solid color-mix(in srgb, var(--color-border) 60%, transparent)",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.35)",
      }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            color: "var(--color-muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "2rem",
              height: "2rem",
              border: "3px solid color-mix(in srgb, var(--color-accent) 30%, transparent)",
              borderTopColor: "var(--color-accent)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <span>Rendering 3D V6 Engine...</span>
        </div>
      )}

      {error && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ef4444",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
          }}
        >
          {error}
        </div>
      )}

      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {/* Control Badge & Title Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "0.85rem",
          left: "1rem",
          right: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pointerEvents: "none",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(8px)",
            padding: "0.35rem 0.75rem",
            borderRadius: "9999px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "#f97316", fontWeight: 700 }}>
            V6 Engine Assembly
          </span>
          <span style={{ fontSize: "0.7rem", color: "var(--color-muted)" }}>• SolidWorks 3D</span>
        </div>

        <div
          style={{
            background: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(8px)",
            padding: "0.35rem 0.75rem",
            borderRadius: "9999px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            fontSize: "0.7rem",
            color: "var(--color-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          🖱️ Rotate / Zoom 3D
        </div>
      </div>
    </div>
  );
}
