import * as THREE from 'three';

/**
 * Three.js Scene Manager
 */

export class SceneManager {
    canvas: HTMLCanvasElement;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particleMesh: THREE.Group | null = null;
    lights: {
        ambient?: THREE.AmbientLight;
        directional?: THREE.DirectionalLight;
        point?: THREE.PointLight;
    } = {};

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        
        this.init();
    }
    
    init() {
        // Scene
        this.scene.background = null; // Transparent
        
        // Camera
        this.camera.position.z = 200;
        
        // Renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Lights
        this.setupLights();
        
        // Resize handler
        window.addEventListener('resize', () => this.onResize());
    }
    
    setupLights() {
        // Ambient light
        this.lights.ambient = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(this.lights.ambient);
        
        // Directional light (will be animated)
        this.lights.directional = new THREE.DirectionalLight(0xffffff, 0.8);
        this.lights.directional.position.set(-50, 100, 50);
        this.scene.add(this.lights.directional);
        
        // Point light (accent)
        this.lights.point = new THREE.PointLight(0x00D9FF, 0.5, 300);
        this.lights.point.position.set(0, 0, 100);
        this.scene.add(this.lights.point);
    }
    
    createParticleMesh(geometry: THREE.BufferGeometry, color: number = 0x6B46C1): THREE.Group {
        // Points material
        const pointsMaterial = new THREE.PointsMaterial({
            color: color,
            size: 2,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        const points = new THREE.Points(geometry, pointsMaterial);
        
        // Wireframe lines
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00D9FF,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });
        
        const lineGeometry = new THREE.WireframeGeometry(geometry);
        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        
        // Group
        this.particleMesh = new THREE.Group();
        this.particleMesh.add(points);
        this.particleMesh.add(lines);
        this.scene.add(this.particleMesh);
        
        return this.particleMesh;
    }
    
    updateGeometry(newVertices: Float32Array) {
        if (!this.particleMesh) return;
        
        const points = this.particleMesh.children[0] as THREE.Points;
        const lines = this.particleMesh.children[1] as THREE.LineSegments;
        
        // Update positions
        points.geometry.setAttribute('position', new THREE.BufferAttribute(newVertices, 3));
        points.geometry.attributes.position.needsUpdate = true;
        
        // Update wireframe
        // For wireframe, we need to regenerate it because the topology might change if we were changing faces,
        // but here we are just morphing positions. However, WireframeGeometry is static.
        // To properly update wireframe for morphing, we might need a different approach or just update its position attribute if topology is same.
        // The spec re-creates WireframeGeometry.
        
        const wireframe = new THREE.WireframeGeometry(points.geometry);
        lines.geometry.dispose();
        lines.geometry = wireframe;
    }
    
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    
    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
