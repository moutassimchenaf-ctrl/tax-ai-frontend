#!/bin/bash

# Convert GLTF/GLB to React Three Fiber component
# Usage: ./scripts/gltf-to-jsx.sh input.glb [output_dir]

if [ "$#" -lt 1 ]; then
    echo "Usage: $0 input.glb [output_dir]"
    exit 1
fi

INPUT=$1
OUTPUT_DIR=${2:-src/components/3d/generated}

# Ensure gltfjsx is installed
if ! command -v npx &> /dev/null; then
    echo "npx not found. Please install Node.js."
    exit 1
fi

echo "Converting $INPUT to JSX..."

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Generate Component
# - --types: Generate TypeScript types
# - --shadows: Enable shadows
# - --keepnames: Keep object names
# - --meta: Add metadata
# - --precision 2: Float precision

npx gltfjsx "$INPUT" \
    --out "$OUTPUT_DIR/$(basename "$INPUT" .glb).tsx" \
    --types \
    --shadows \
    --keepnames \
    --meta \
    --precision 2

echo "Conversion complete! Component saved to $OUTPUT_DIR"
