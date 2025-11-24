import bpy
import os
import math

def create_tai_cube():
    # Clear existing objects
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()

    # Create Cube
    bpy.ops.mesh.primitive_cube_add(size=2, location=(0, 0, 0))
    cube = bpy.context.active_object
    cube.name = "TAiCube"

    # Add Bevel Modifier
    bevel = cube.modifiers.new(name="Bevel", type='BEVEL')
    bevel.width = 0.05
    bevel.segments = 3

    # Create Material
    mat = bpy.data.materials.new(name="TAi_Material")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    
    # Principled BSDF
    bsdf = nodes.get("Principled BSDF")
    bsdf.inputs['Base Color'].default_value = (0.0, 0.2, 0.8, 1) # Blue
    bsdf.inputs['Metallic'].default_value = 0.8
    bsdf.inputs['Roughness'].default_value = 0.2
    bsdf.inputs['Emission'].default_value = (0.0, 0.1, 0.4, 1)
    bsdf.inputs['Emission Strength'].default_value = 2.0

    # Assign Material
    if cube.data.materials:
        cube.data.materials[0] = mat
    else:
        cube.data.materials.append(mat)

    # Create Camera
    bpy.ops.object.camera_add(location=(5, -5, 5))
    camera = bpy.context.active_object
    camera.rotation_euler = (math.radians(45), 0, math.radians(45))

    # Create Light
    bpy.ops.object.light_add(type='AREA', location=(5, 5, 10))
    light = bpy.context.active_object
    light.data.energy = 1000

    # Export to GLB
    output_path = os.path.join(os.getcwd(), "public/models/TAiCube.glb")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    bpy.ops.export_scene.gltf(
        filepath=output_path,
        export_format='GLB',
        use_selection=False,
        export_draco_mesh_compression_enable=False, # We use gltf-transform for this
    )
    print(f"Exported to {output_path}")

if __name__ == "__main__":
    create_tai_cube()
