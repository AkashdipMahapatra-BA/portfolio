"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

export function V6EngineViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // HD Mode state (defaults to false on mobile for max page smoothness)
  const [isHdMode, setIsHdMode] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleToggleClick = () => {
    if (!isHdMode) {
      setShowWarningModal(true);
    } else {
      setIsHdMode(false);
    }
  };

  const confirmEnableHd = () => {
    setShowWarningModal(false);
    setIsHdMode(true);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 350;
    const isMobile = window.innerWidth <= 768 || navigator.maxTouchPoints > 0;

    // Determine quality: HD mode forces ultra-high quality antialiasing and 2.0x pixel ratio
    const useHighQuality = isHdMode || !isMobile;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: useHighQuality,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, useHighQuality ? 2.0 : 1.25));
    renderer.shadowMap.enabled = useHighQuality;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 1.2);
    scene.add(hemiLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.8);
    mainLight.position.set(6, 12, 8);
    if (useHighQuality) mainLight.castShadow = true;
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x0ea5e9, 1.8);
    rimLight.position.set(-6, -4, -6);
    scene.add(rimLight);

    const orangeSpotLight = new THREE.PointLight(0xf97316, 3.2, 12);
    orangeSpotLight.position.set(-3, 1, 4);
    scene.add(orangeSpotLight);

    // 5. Orbit Controls
    let controls: any = null;
    import("three-stdlib").then(({ OrbitControls }) => {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.0;
      controls.maxPolarAngle = Math.PI / 1.6;
      controls.minDistance = 0.8;
      controls.maxDistance = 10.0;
    });

    // 6. Materials
    const pistonGoldMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#e29547"),
      metalness: 0.75,
      roughness: 0.25,
    });

    const rodMagentaMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#c026d3"),
      metalness: 0.6,
      roughness: 0.3,
    });

    const chromeCrankMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#f1f5f9"),
      metalness: 0.92,
      roughness: 0.12,
    });

    const pistonRingDarkMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1e293b"),
      metalness: 0.85,
      roughness: 0.4,
    });

    const engravedTextPlateMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#cbd5e1"),
      metalness: 0.85,
      roughness: 0.2,
      emissive: new THREE.Color("#ea580c"),
      emissiveIntensity: 0.2,
    });

    // 7. Load GLB model & Calculate Optimal Camera Distance to Fill Maximum Canvas Area without Clipping
    const tempBox = new THREE.Box3();
    const tempCenter = new THREE.Vector3();
    const tempSize = new THREE.Vector3();
    const tempSphere = new THREE.Sphere();

    const loader = new GLTFLoader();
    loader.load(
      "/models/v6_engine.glb",
      (gltf) => {
        const model = gltf.scene;

        // Center model at origin
        tempBox.setFromObject(model);
        tempBox.getCenter(tempCenter);
        model.position.sub(tempCenter);

        // Compute 3D bounding sphere radius
        tempBox.setFromObject(model);
        tempBox.getBoundingSphere(tempSphere);
        const radius = tempSphere.radius || 1.0;

        // Calculate optimal camera distance to fill maximum viewport space without clipping on 360° rotation
        const aspect = width / height;
        const fovRad = (camera.fov * Math.PI) / 180;
        const hFovRad = 2 * Math.atan(Math.tan(fovRad / 2) * aspect);
        const minFovRad = Math.min(fovRad, hFovRad);

        // Fit sphere with a tight 10% safety margin so model is prominent & never clipped during rotation
        const fitDistance = (radius / Math.sin(minFovRad / 2)) * 1.10;

        const viewDirection = new THREE.Vector3(0.65, 0.42, 0.75).normalize();
        camera.position.copy(viewDirection.multiplyScalar(fitDistance));
        camera.lookAt(0, 0, 0);

        if (controls) {
          controls.target.set(0, 0, 0);
          controls.update();
        }

        const meshes: THREE.Mesh[] = [];
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (useHighQuality) {
              mesh.castShadow = true;
              mesh.receiveShadow = true;
            }
            meshes.push(mesh);
          }
        });

        meshes.forEach((mesh) => {
          tempBox.setFromObject(mesh);
          tempBox.getCenter(tempCenter);
          tempBox.getSize(tempSize);
          const name = mesh.name.toLowerCase();

          const isFlywheelDisk = tempCenter.x < -0.8 || name.includes("akashdip") || name.includes("disk") || name.includes("plate");

          if (isFlywheelDisk) {
            mesh.material = engravedTextPlateMaterial;
          } else if (name.includes("ring") || (tempCenter.y > 0.45 && tempSize.y < 0.15)) {
            mesh.material = pistonRingDarkMaterial;
          } else if (name.includes("piston") || tempCenter.y > 0.25) {
            mesh.material = pistonGoldMaterial;
          } else if (name.includes("rod") || (tempCenter.y <= 0.25 && tempCenter.y >= -0.3 && tempSize.y > 0.35)) {
            mesh.material = rodMagentaMaterial;
          } else {
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

    // 8. IntersectionObserver to pause rendering when off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 9. Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;
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
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [isHdMode]);

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
      {/* Top Floating HD Toggle Button */}
      <div
        style={{
          position: "absolute",
          top: "0.75rem",
          right: "0.75rem",
          zIndex: 20,
        }}
      >
        <button
          onClick={handleToggleClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            background: isHdMode
              ? "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)"
              : "rgba(15, 23, 42, 0.85)",
            color: "#ffffff",
            border: isHdMode
              ? "1px solid rgba(56, 189, 248, 0.5)"
              : "1px solid rgba(255, 255, 255, 0.2)",
            padding: "0.35rem 0.75rem",
            borderRadius: "9999px",
            fontSize: "0.72rem",
            fontWeight: 600,
            fontFamily: "var(--font-mono)",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            boxShadow: isHdMode
              ? "0 4px 14px rgba(2, 132, 199, 0.35)"
              : "0 4px 12px rgba(0, 0, 0, 0.25)",
            transition: "all 0.2s ease",
          }}
        >
          <span>{isHdMode ? " HD View Active" : " Render HD View"}</span>
          {isHdMode && <span style={{ fontSize: "0.65rem", opacity: 0.9 }}>(Tap for Normal)</span>}
        </button>
      </div>

      {/* Loading state indicator */}
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

      {/* Error display */}
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

      {/* ⚠️ Performance Warning Confirmation Modal */}
      {showWarningModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.25rem",
            background: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              maxWidth: "28rem",
              width: "100%",
              background: "#0f172a",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              borderRadius: "1.25rem",
              padding: "1.75rem 1.5rem 1.5rem 1.5rem",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "3.25rem",
                height: "3.25rem",
                borderRadius: "50%",
                background: "rgba(249, 115, 22, 0.12)",
                border: "1px solid rgba(249, 115, 22, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                fontSize: "1.5rem",
              }}
            >
              ⚠️
            </div>

            <h3
              style={{
                margin: "0 0 0.6rem 0",
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "#f8fafc",
                lineHeight: 1.3,
              }}
            >
              Enable High Fidelity HD Rendering?
            </h3>

            <p
              style={{
                margin: "0 0 1.5rem 0",
                fontSize: "0.82rem",
                color: "#94a3b8",
                lineHeight: 1.6,
              }}
            >
              Enabling HD mode activates constant 60Hz full antialiasing and studio lighting reflections. On some mobile devices, this may increase CPU/GPU load and cause temporary page scrolling lag.
            </p>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setShowWarningModal(false)}
                style={{
                  flex: 1,
                  padding: "0.65rem 1rem",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  background: "rgba(30, 41, 59, 0.7)",
                  color: "#cbd5e1",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                Cancel
              </button>

              <button
                onClick={confirmEnableHd}
                style={{
                  flex: 1,
                  padding: "0.65rem 1rem",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(56, 189, 248, 0.5)",
                  background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                  color: "#ffffff",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(2, 132, 199, 0.4)",
                  transition: "all 0.15s ease",
                }}
              >
                Proceed to HD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
