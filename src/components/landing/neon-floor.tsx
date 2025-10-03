"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function NeonFloor() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 1);
    camera.rotation.x = -Math.PI * 0.1; // Look slightly down

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Grid
    const gridSize = 100;
    const gridDivisions = 40;
    const gridColor = new THREE.Color(0x40e0d0);

    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, gridColor, gridColor);
    gridHelper.position.y = -2;
    scene.add(gridHelper);
    
    // Mouse interaction
    const mouse = new THREE.Vector2();
    const onMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
        requestAnimationFrame(animate);

        // Move the grid forward
        gridHelper.position.z = (gridHelper.position.z + clock.getDelta() * 5) % (gridSize / gridDivisions);
        
        // Interactive look left/right
        const targetX = mouse.x * 0.5;
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.lookAt(new THREE.Vector3(camera.position.x, -1, -5));

        renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', onMouseMove);
        if (renderer.domElement.parentElement === currentMount) {
            currentMount.removeChild(renderer.domElement);
        }
        // Dispose Three.js objects
        scene.remove(gridHelper);
        gridHelper.geometry.dispose();
        if (Array.isArray(gridHelper.material)) {
            gridHelper.material.forEach(m => m.dispose());
        } else {
            gridHelper.material.dispose();
        }
        renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-[-1]" />;
}
