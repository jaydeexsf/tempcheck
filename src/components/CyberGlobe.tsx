'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DomainNode {
  name: string;
  lat: number;
  lon: number;
  mesh?: THREE.Mesh;
  elem?: HTMLDivElement;
}

// 6 Iconic, clean domain nodes spread across global coordinates
const nodesData: DomainNode[] = [
  { name: 'tempmail.com', lat: 40.71, lon: -74.01 },       // North America
  { name: '10minutemail.com', lat: 34.05, lon: -118.24 },   // US West
  { name: 'guerrillamail.com', lat: 51.51, lon: -0.13 },    // Europe
  { name: 'yopmail.com', lat: 35.68, lon: 139.76 },         // Asia
  { name: 'mailinator.com', lat: -33.87, lon: 151.21 },     // Oceania
  { name: 'emailondeck.com', lat: 41.87, lon: -87.62 },     // US Midwest
];

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Procedural cyan earth texture fallback
function createProceduralEarthTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#020d18';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0, 240, 255, 0.45)';
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += 16) {
      for (let y = 0; y < canvas.height; y += 16) {
        const nx = x / canvas.width;
        const ny = y / canvas.height;
        const isLand = (
          (nx > 0.15 && nx < 0.35 && ny > 0.2 && ny < 0.6) ||
          (nx > 0.25 && nx < 0.4 && ny > 0.55 && ny < 0.85) ||
          (nx > 0.45 && nx < 0.6 && ny > 0.15 && ny < 0.5) ||
          (nx > 0.45 && nx < 0.65 && ny > 0.45 && ny < 0.8) ||
          (nx > 0.6 && nx < 0.9 && ny > 0.15 && ny < 0.65) ||
          (nx > 0.75 && nx < 0.92 && ny > 0.65 && ny < 0.85)
        );
        if (isLand && Math.random() > 0.2) {
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }
  return new THREE.CanvasTexture(canvas);
}

export default function CyberGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const labelContainer = labelContainerRef.current;
    if (!container || !labelContainer) return;

    let width = container.clientWidth || 520;
    let height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const existingCanvas = container.querySelector('canvas');
    if (existingCanvas) {
      container.removeChild(existingCanvas);
    }
    container.insertBefore(renderer.domElement, labelContainer);

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // Dark Core Sphere
    const oceanGeom = new THREE.SphereGeometry(1.98, 64, 64);
    const oceanMat = new THREE.MeshBasicMaterial({ color: 0x020d18 });
    earthGroup.add(new THREE.Mesh(oceanGeom, oceanMat));

    // Cyan Glowing Landmass
    const textureLoader = new THREE.TextureLoader();
    let landTexture: THREE.Texture;

    try {
      landTexture = textureLoader.load(
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/textures/planets/earth_specular_2048.jpg',
        undefined,
        undefined,
        () => {
          landMat.map = createProceduralEarthTexture();
          landMat.needsUpdate = true;
        }
      );
    } catch {
      landTexture = createProceduralEarthTexture();
    }

    const landGeom = new THREE.SphereGeometry(2, 64, 64);
    const landMat = new THREE.MeshBasicMaterial({
      map: landTexture,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.85,
    });
    earthGroup.add(new THREE.Mesh(landGeom, landMat));

    // Wireframe Grid
    const wireframeGeom = new THREE.WireframeGeometry(new THREE.SphereGeometry(2.01, 32, 16));
    const wireframeMat = new THREE.LineBasicMaterial({ color: 0x005577, transparent: true, opacity: 0.2 });
    earthGroup.add(new THREE.LineSegments(wireframeGeom, wireframeMat));

    // Domain Nodes & Floating Text Badges
    while (labelContainer.firstChild) {
      labelContainer.removeChild(labelContainer.firstChild);
    }

    const activeNodes = nodesData.map((node) => {
      const pointGeom = new THREE.SphereGeometry(0.04, 16, 16);
      const pointMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const pointMesh = new THREE.Mesh(pointGeom, pointMat);

      const pos = latLonToVector3(node.lat, node.lon, 2.02);
      pointMesh.position.copy(pos);
      earthGroup.add(pointMesh);

      const div = document.createElement('div');
      div.className = 'label';
      div.textContent = node.name;
      labelContainer.appendChild(div);

      return {
        ...node,
        mesh: pointMesh,
        elem: div,
      };
    });

    camera.position.z = 5.2;
    const camDir = new THREE.Vector3(0, 0, 1);
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth, slow, elegant rotation
      earthGroup.rotation.y += 0.0012;

      const containerRect = container.getBoundingClientRect();

      activeNodes.forEach((node) => {
        if (!node.mesh || !node.elem) return;

        const worldPos = new THREE.Vector3();
        node.mesh.getWorldPosition(worldPos);

        const nodeNormal = worldPos.clone().normalize();
        const dot = nodeNormal.dot(camDir);

        if (dot < 0.2) {
          node.elem.style.opacity = '0';
          node.elem.style.transform = `translate3d(-50%, -50%, 0) scale(0)`;
        } else {
          const tempV = worldPos.clone().project(camera);
          const x = ((tempV.x + 1) * containerRect.width) / 2;
          const y = ((-tempV.y + 1) * containerRect.height) / 2;

          const scale = 0.4 + Math.sin((dot * Math.PI) / 2) * 0.65;
          const opacity = Math.min(1, (dot - 0.2) * 2.5);

          node.elem.style.opacity = opacity.toFixed(2);
          node.elem.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(2)})`;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width || container.clientWidth || 520;
        const h = entry.contentRect.height || container.clientHeight || 520;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      activeNodes.forEach((node) => {
        if (node.elem && labelContainer.contains(node.elem)) {
          labelContainer.removeChild(node.elem);
        }
      });
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      id="globe-container"
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '340px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div id="labels-container" ref={labelContainerRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10, overflow: 'hidden' }} />
    </div>
  );
}
