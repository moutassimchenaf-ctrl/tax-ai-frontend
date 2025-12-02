import * as THREE from 'three';
import { SceneManager } from '../core/scene';
import { ParticleGeometry } from '../core/particles';

/**
 * Scroll-to-Animation Synchronization
 * Maps scroll position to animation timeline progress
 */

export class ScrollTimeline {
    sceneManager: SceneManager;
    scrollProgress: number = 0;
    maxScroll: number = 0;
    currentSection: number = 0;
    morphTargets: Float32Array[];
    currentGeometry: Float32Array;

    constructor(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
        
        // Morph targets (pre-generated)
        this.morphTargets = this.generateMorphTargets();
        
        // Current interpolated geometry
        this.currentGeometry = new Float32Array(this.morphTargets[0]);
        
        this.init();
    }
    
    generateMorphTargets(): Float32Array[] {
        return [
            ParticleGeometry.generateSphere(50, 3).vertices,     // Section 0: Hero
            ParticleGeometry.generateGrid(100, 25),              // Section 1: Stagger
            ParticleGeometry.generateWave(120, 30, 50),          // Section 2: SVG
            ParticleGeometry.generateChaos(150, 642)             // Section 3: Performance
        ];
    }
    
    init() {
        this.calculateMaxScroll();
        
        window.addEventListener('scroll', () => this.onScroll());
        window.addEventListener('resize', () => this.calculateMaxScroll());
        
        // Initial render
        this.onScroll();
    }
    
    calculateMaxScroll() {
        // We assume the body or a specific container is scrolling
        this.maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    }
    
    onScroll() {
        if (this.maxScroll <= 0) {
             this.calculateMaxScroll();
             if (this.maxScroll <= 0) return;
        }

        // Normalize scroll (0 to 1)
        this.scrollProgress = Math.min(
            Math.max(window.scrollY / this.maxScroll, 0),
            1
        );
        
        // Determine current section
        const sections = document.querySelectorAll('[data-scroll-section]');
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
            
            if (inView) {
                this.currentSection = index;
            }
        });
        
        // Update geometry
        this.updateMorph();
        
        // Update colors
        this.updateColors();
        
        // Update lighting
        this.updateLighting();
        
        // Update camera
        this.updateCamera();
        
        // Render
        this.sceneManager.render();
    }
    
    updateMorph() {
        const sectionCount = this.morphTargets.length;
        // We have 4 targets, so 3 transitions.
        // Scroll 0 -> Target 0
        // Scroll 1 -> Target 3
        const sectionProgress = this.scrollProgress * (sectionCount - 1);
        const fromIndex = Math.floor(sectionProgress);
        const toIndex = Math.min(fromIndex + 1, sectionCount - 1);
        const localProgress = sectionProgress - fromIndex;
        
        // Interpolate between morph targets
        const from = this.morphTargets[fromIndex];
        const to = this.morphTargets[toIndex];
        
        // Easing function (inOutQuad)
        const eased = localProgress < 0.5
            ? 2 * localProgress * localProgress
            : 1 - Math.pow(-2 * localProgress + 2, 2) / 2;
        
        // Ensure lengths match (they should if we padded correctly)
        const len = Math.min(from.length, to.length, this.currentGeometry.length);

        for (let i = 0; i < len; i++) {
            this.currentGeometry[i] = from[i] + (to[i] - from[i]) * eased;
        }
        
        this.sceneManager.updateGeometry(this.currentGeometry);
    }
    
    updateColors() {
        if (!this.sceneManager.particleMesh) return;
        
        const points = this.sceneManager.particleMesh.children[0] as THREE.Points;
        const lines = this.sceneManager.particleMesh.children[1] as THREE.LineSegments;
        
        // Color progression through scroll
        const colors = [
            { r: 0.42, g: 0.27, b: 0.76 },  // Purple #6B46C1
            { r: 0.93, g: 0.28, b: 0.60 },  // Magenta #EC4899
            { r: 1.00, g: 0.42, b: 0.21 },  // Orange #FF6B35
            { r: 0.24, g: 0.51, b: 0.96 }   // Blue #3B82F6
        ];
        
        const colorIndex = this.scrollProgress * (colors.length - 1);
        const fromColorIdx = Math.floor(colorIndex);
        const toColorIdx = Math.min(fromColorIdx + 1, colors.length - 1);
        const colorProgress = colorIndex - fromColorIdx;
        
        const fromColor = colors[fromColorIdx];
        const toColor = colors[toColorIdx];
        
        const currentColor = {
            r: fromColor.r + (toColor.r - fromColor.r) * colorProgress,
            g: fromColor.g + (toColor.g - fromColor.g) * colorProgress,
            b: fromColor.b + (toColor.b - fromColor.b) * colorProgress
        };
        
        if (points.material instanceof THREE.PointsMaterial) {
             points.material.color.setRGB(currentColor.r, currentColor.g, currentColor.b);
        }
        
        // Line color (cyan with varying opacity)
        if (lines.material instanceof THREE.LineBasicMaterial) {
            lines.material.opacity = 0.2 + Math.sin(this.scrollProgress * Math.PI) * 0.3;
        }
    }
    
    updateLighting() {
        const light = this.sceneManager.lights.directional;
        if (!light) return;

        // Light migrates around the scene
        light.position.x = Math.sin(this.scrollProgress * Math.PI * 2) * 100;
        light.position.y = 100 + Math.cos(this.scrollProgress * Math.PI) * 50;
        light.position.z = 50 + Math.sin(this.scrollProgress * Math.PI * 4) * 30;
        
        // Point light intensity
        const pointLight = this.sceneManager.lights.point;
        if (pointLight) {
            pointLight.intensity = 0.3 + Math.sin(this.scrollProgress * Math.PI * 2) * 0.4;
        }
    }
    
    updateCamera() {
        // Subtle camera movement
        this.sceneManager.camera.position.x = Math.sin(this.scrollProgress * Math.PI) * 20;
        this.sceneManager.camera.position.y = Math.cos(this.scrollProgress * Math.PI * 0.5) * 10;
        this.sceneManager.camera.lookAt(0, 0, 0);
        
        // Rotation
        if (this.sceneManager.particleMesh) {
            this.sceneManager.particleMesh.rotation.y = this.scrollProgress * Math.PI * 2;
            this.sceneManager.particleMesh.rotation.x = Math.sin(this.scrollProgress * Math.PI) * 0.3;
        }
    }
}
