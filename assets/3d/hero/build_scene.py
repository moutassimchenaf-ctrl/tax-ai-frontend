import bpy
import math

def create_tai_cube():
    # Clear existing objects
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()

    # Create Cube
    bpy.ops.mesh.primitive_cube_add(size=2, enter_editmode=False, align='WORLD', location=(0, 0, 0))
    cube = bpy.context.active_object
    cube.name = "TAiCube"

    # Add Bevel Modifier
    bevel = cube.modifiers.new(name="Bevel", type='BEVEL')
    bevel.width = 0.05
    bevel.segments = 3

    # Create Material
    mat = bpy.data.materials.new(name="TAiMaterial")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links

    # Clear default nodes
    nodes.clear()

    # Create Principled BSDF
    bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
    bsdf.location = (0, 0)
    
    # Set Material Properties (Titan Teal)
    bsdf.inputs['Base Color'].default_value = (0.02, 0.44, 0.54, 1) # #06708A approx
    bsdf.inputs['Metallic'].default_value = 0.8
    bsdf.inputs['Roughness'].default_value = 0.2
    bsdf.inputs['Emission'].default_value = (0.0, 0.1, 0.15, 1) # Slight glow
    bsdf.inputs['Emission Strength'].default_value = 2.0

    # Output
    output = nodes.new(type='ShaderNodeOutputMaterial')
    output.location = (300, 0)
    links.new(bsdf.outputs['BSDF'], output.inputs['Surface'])

    # Assign Material
    if cube.data.materials:
        cube.data.materials[0] = mat
    else:
        cube.data.materials.append(mat)

    # Setup Camera
    bpy.ops.object.camera_add(enter_editmode=False, align='VIEW', location=(5, -5, 5), rotation=(1.1, 0, 0.78))
    cam = bpy.context.active_object
    cam.name = "Camera"

    # Setup Light
    bpy.ops.object.light_add(type='AREA', radius=5, align='WORLD', location=(5, 5, 10))
    light = bpy.context.active_object
    light.data.energy = 500

    # Export to glTF
    bpy.ops.export_scene.gltf(filepath="TAiCube.glb", export_format='GLB', use_selection=True)

if __name__ == "__main__":
    create_tai_cube()
