'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SceneManager } from './core/scene';
import { ParticleGeometry } from './core/particles';
import { ScrollTimeline } from './animations/scrollTimeline';

export const TAiEngineScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneManagerRef = useRef<SceneManager | null>(null);
  const scrollTimelineRef = useRef<ScrollTimeline | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize SceneManager
    const sceneManager = new SceneManager(canvasRef.current);
    sceneManagerRef.current = sceneManager;

    // Create initial geometry (Sphere)
    const { vertices } = ParticleGeometry.generateSphere(50, 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    sceneManager.createParticleMesh(geometry);

    // Initialize ScrollTimeline
    const scrollTimeline = new ScrollTimeline(sceneManager);
    scrollTimelineRef.current = scrollTimeline;

    // Animation Loop (for idle rotation)
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Idle rotation when not scrolling (optional, can be handled in ScrollTimeline or here)
      // For now, let's rely on ScrollTimeline's onScroll for updates, 
      // but we might want a continuous loop if we have time-based animations independent of scroll.
      // The spec mentioned "Idle rotation when not scrolling".
      
      if (sceneManager.particleMesh && window.scrollY === 0) {
          sceneManager.particleMesh.rotation.y += 0.001;
          sceneManager.render();
      }
    };
    
    animate();

    return () => {
      // Cleanup if necessary
      // Remove event listeners added by SceneManager/ScrollTimeline if they don't clean themselves up
      // (Currently they add listeners to window, we should probably move listener management here or add cleanup methods)
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
};
