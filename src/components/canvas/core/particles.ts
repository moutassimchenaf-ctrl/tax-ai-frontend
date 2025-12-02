import * as THREE from 'three';

/**
 * Particle Mesh Generator
 * Creates geometric shapes from vertex data
 */

export class ParticleGeometry {
    /**
     * Generate Icosphere (Geodesic Dome)
     * @param radius - Sphere radius
     * @param subdivisions - Tessellation level (0-4)
     * @returns Object containing vertices (Float32Array) and faces (array of indices)
     */
    static generateSphere(radius: number = 50, subdivisions: number = 3): { vertices: Float32Array; faces: number[][] } {
        const vertices: number[] = [];
        
        // Golden ratio
        const t = (1.0 + Math.sqrt(5.0)) / 2.0;
        
        // Initial icosahedron vertices (12 vertices)
        const baseVertices = [
            [-1,  t,  0], [ 1,  t,  0], [-1, -t,  0], [ 1, -t,  0],
            [ 0, -1,  t], [ 0,  1,  t], [ 0, -1, -t], [ 0,  1, -t],
            [ t,  0, -1], [ t,  0,  1], [-t,  0, -1], [-t,  0,  1]
        ];
        
        // Normalize and scale
        baseVertices.forEach(v => {
            const length = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
            vertices.push(
                v[0] / length * radius,
                v[1] / length * radius,
                v[2] / length * radius
            );
        });
        
        // Icosahedron faces (20 triangular faces)
        const baseFaces = [
            [0,11,5], [0,5,1], [0,1,7], [0,7,10], [0,10,11],
            [1,5,9], [5,11,4], [11,10,2], [10,7,6], [7,1,8],
            [3,9,4], [3,4,2], [3,2,6], [3,6,8], [3,8,9],
            [4,9,5], [2,4,11], [6,2,10], [8,6,7], [9,8,1]
        ];
        
        // Subdivide triangles
        let faces = baseFaces;
        for (let i = 0; i < subdivisions; i++) {
            const newFaces: number[][] = [];
            const midCache: { [key: string]: number } = {};
            
            faces.forEach(face => {
                const [a, b, c] = face;
                
                // Get midpoints (with caching to avoid duplicates)
                const getMid = (v1: number, v2: number) => {
                    const key = `${Math.min(v1,v2)}_${Math.max(v1,v2)}`;
                    if (midCache[key]) return midCache[key];
                    
                    const idx = vertices.length / 3;
                    const x = (vertices[v1*3] + vertices[v2*3]) / 2;
                    const y = (vertices[v1*3+1] + vertices[v2*3+1]) / 2;
                    const z = (vertices[v1*3+2] + vertices[v2*3+2]) / 2;
                    
                    // Normalize to sphere surface
                    const len = Math.sqrt(x**2 + y**2 + z**2);
                    vertices.push(
                        x / len * radius,
                        y / len * radius,
                        z / len * radius
                    );
                    
                    midCache[key] = idx;
                    return idx;
                };
                
                const ab = getMid(a, b);
                const bc = getMid(b, c);
                const ca = getMid(c, a);
                
                // Create 4 new triangles
                newFaces.push([a, ab, ca]);
                newFaces.push([b, bc, ab]);
                newFaces.push([c, ca, bc]);
                newFaces.push([ab, bc, ca]);
            });
            
            faces = newFaces;
        }
        
        return { vertices: new Float32Array(vertices), faces };
    }
    
    /**
     * Generate 2D Grid (Plane)
     * @param size - Grid size
     * @param resolution - Points per axis
     * @returns vertices (Float32Array)
     */
    static generateGrid(size: number = 100, resolution: number = 25): Float32Array {
        const vertices: number[] = [];
        const step = size / (resolution - 1);
        const offset = size / 2;
        
        for (let y = 0; y < resolution; y++) {
            for (let x = 0; x < resolution; x++) {
                vertices.push(
                    x * step - offset,  // X
                    y * step - offset,  // Y
                    0                   // Z (flat)
                );
            }
        }
        
        return new Float32Array(vertices);
    }
    
    /**
     * Generate Sine Wave Ribbon
     * @param width - Wave width
     * @param height - Wave amplitude
     * @param segments - Point count
     * @returns vertices (Float32Array)
     */
    static generateWave(width: number = 120, height: number = 30, segments: number = 50): Float32Array {
        const vertices: number[] = [];
        const step = width / segments;
        
        for (let i = 0; i < segments; i++) {
            const x = i * step - width / 2;
            const t = (i / segments) * Math.PI * 4; // 4 complete cycles
            
            const y = Math.sin(t) * height;
            const z = Math.cos(t * 0.5) * height * 0.5;
            
            vertices.push(x, y, z);
        }
        
        // Pad to match sphere vertex count (approx 642 for subdivision 3)
        // We need to ensure we have enough vertices for the morph target
        const targetCount = 642; 
        const currentCount = vertices.length / 3;
        
        for (let i = currentCount; i < targetCount; i++) {
            vertices.push(
                Math.random() * width - width/2,
                Math.random() * height - height/2,
                Math.random() * height - height/2
            );
        }
        
        return new Float32Array(vertices);
    }
    
    /**
     * Generate Chaos (Random Scatter)
     * @param spread - Distribution range
     * @param count - Vertex count
     * @returns vertices (Float32Array)
     */
    static generateChaos(spread: number = 150, count: number = 642): Float32Array {
        const vertices: number[] = [];
        
        for (let i = 0; i < count; i++) {
            vertices.push(
                (Math.random() - 0.5) * spread,
                (Math.random() - 0.5) * spread,
                (Math.random() - 0.5) * spread
            );
        }
        
        return new Float32Array(vertices);
    }
}
