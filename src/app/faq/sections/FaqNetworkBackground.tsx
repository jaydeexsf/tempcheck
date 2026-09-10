'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

export default function FaqNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);

    const network = new THREE.Group();
    network.rotation.set(0.08, -0.22, 0.04);
    scene.add(network);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.45, 1),
      new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.16,
      }),
    );
    network.add(core);

    const orbitMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.28 }),
      new THREE.MeshBasicMaterial({ color: 0x8cf0d0, transparent: true, opacity: 0.18 }),
    ];

    const orbitOne = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.012, 8, 96), orbitMaterials[0]);
    orbitOne.rotation.set(0.8, 0.2, 0.1);
    network.add(orbitOne);

    const orbitTwo = new THREE.Mesh(new THREE.TorusGeometry(2.55, 0.009, 8, 96), orbitMaterials[1]);
    orbitTwo.rotation.set(-0.45, 0.7, 0.8);
    network.add(orbitTwo);

    const nodePositions = [
      [-2.2, 0.8, 0.2], [1.95, 1.15, -0.1], [2.3, -0.85, 0.3],
      [-1.8, -1.25, -0.2], [0.1, 2.1, 0.1], [-0.15, -2.2, 0.15],
    ].map(([x, y, z]) => new THREE.Vector3(x, y, z));

    const nodeGeometry = new THREE.SphereGeometry(0.065, 10, 10);
    const nodeGroup = new THREE.Group();
    nodeGroup.name = 'faq-nodes';
    nodePositions.forEach((position, index) => {
      const node = new THREE.Mesh(nodeGeometry, new THREE.MeshBasicMaterial({
        color: index % 2 === 0 ? 0x00f0ff : 0x8cf0d0,
        transparent: true,
        opacity: 0.75,
      }));
      node.position.copy(position);
      nodeGroup.add(node);
    });
    network.add(nodeGroup);

    const signalMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.8,
    });
    const signal = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), signalMaterial);
    signal.position.copy(nodePositions[0]);
    network.add(signal);

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(
      nodePositions.flatMap((position, index) => [position, nodePositions[(index + 1) % nodePositions.length]]),
    );
    const lines = new THREE.LineSegments(
      lineGeometry,
      new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.1 }),
    );
    network.add(lines);

    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.35;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.2;
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const motionTimeline = reducedMotion ? null : gsap.timeline({ repeat: -1 });
    motionTimeline
      ?.to(core.scale, { x: 1.06, y: 1.06, z: 1.06, duration: 2.8, ease: 'sine.inOut', yoyo: true })
      .to(nodeGroup.children, { scale: 1.35, opacity: 1, duration: 0.65, stagger: 0.18, ease: 'power2.out' }, 0)
      .to(nodeGroup.children, { scale: 1, opacity: 0.55, duration: 1.2, stagger: 0.18, ease: 'power2.in' }, 0.65)
      .to(signal.position, { x: nodePositions[1].x, y: nodePositions[1].y, z: nodePositions[1].z, duration: 1.8, ease: 'power1.inOut' }, 0)
      .to(signal.position, { x: nodePositions[2].x, y: nodePositions[2].y, z: nodePositions[2].z, duration: 1.8, ease: 'power1.inOut' })
      .to(signal.position, { x: nodePositions[3].x, y: nodePositions[3].y, z: nodePositions[3].z, duration: 1.8, ease: 'power1.inOut' })
      .to(signal.position, { x: nodePositions[4].x, y: nodePositions[4].y, z: nodePositions[4].z, duration: 1.8, ease: 'power1.inOut' })
      .to(signal.position, { x: nodePositions[5].x, y: nodePositions[5].y, z: nodePositions[5].z, duration: 1.8, ease: 'power1.inOut' })
      .to(signal.position, { x: nodePositions[0].x, y: nodePositions[0].y, z: nodePositions[0].z, duration: 1.8, ease: 'power1.inOut' });

    const render = () => {
      network.rotation.z += (pointer.x - network.rotation.z) * 0.012;
      network.rotation.x += (0.08 - pointer.y - network.rotation.x) * 0.008;
      renderer.render(scene, camera);
    };

    gsap.ticker.add(render);

    return () => {
      motionTimeline?.kill();
      gsap.ticker.remove(render);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      nodeGeometry.dispose();
      core.geometry.dispose();
      (core.material as THREE.Material).dispose();
      orbitOne.geometry.dispose();
      orbitTwo.geometry.dispose();
      orbitMaterials.forEach((material) => material.dispose());
      lineGeometry.dispose();
      (lines.material as THREE.Material).dispose();
      signal.geometry.dispose();
      signalMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="faq-network-background" aria-hidden="true" />;
}
