#!/bin/bash

# Optimize 3D assets using gltf-transform
# Usage: ./scripts/optimize-3d-assets.sh input.glb output.glb

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 input.glb output.glb"
    exit 1
fi

INPUT=$1
OUTPUT=$2

# Ensure gltf-transform is installed
if ! command -v gltf-transform &> /dev/null; then
    echo "gltf-transform not found. Installing..."
    npm install -g @gltf-transform/cli
fi

echo "Optimizing $INPUT -> $OUTPUT..."

# Optimize:
# - dedup: Deduplicate accessors and textures
# - instance: Instance meshes
# - flatten: Flatten scene graph
# - join: Join meshes
# - draco: Compress geometry (requires Draco decoder in client)
# - texture-compress: Compress textures to KTX2 (requires KTX2 loader in client)

gltf-transform optimize "$INPUT" "$OUTPUT" \
    --compress draco \
    --texture-compress ktx2 \
    --simplify weld=0.0001,ratio=0.75,error=0.001

echo "Optimization complete!"
