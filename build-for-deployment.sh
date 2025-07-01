#!/bin/bash

# Build script for deployment compatibility
# This script ensures the build output structure matches deployment requirements

echo "🚀 Building for deployment..."

# Run the standard build
echo "📦 Running Vite build..."
vite build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Vite build failed"
    exit 1
fi

# Build the server
echo "🔧 Building server..."
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Check if server build was successful
if [ $? -ne 0 ]; then
    echo "❌ Server build failed"
    exit 1
fi

# Reorganize build output for deployment compatibility
echo "📁 Reorganizing build output..."
if [ -d "dist/public" ]; then
    echo "   Moving files from dist/public/ to dist/"
    cp -r dist/public/* dist/
    rm -rf dist/public
    echo "   ✅ Files reorganized successfully"
else
    echo "   ⚠️  dist/public directory not found - build structure may have changed"
fi

# Verify the final structure
echo "📋 Final build structure:"
ls -la dist/

# Check for required files
if [ -f "dist/index.html" ]; then
    echo "   ✅ index.html found at dist/index.html"
else
    echo "   ❌ index.html not found at expected location"
    exit 1
fi

if [ -f "dist/index.js" ]; then
    echo "   ✅ server bundle found at dist/index.js"
else
    echo "   ❌ server bundle not found at expected location"
    exit 1
fi

echo ""
echo "🎉 Build completed successfully!"
echo "📁 Static files are ready for deployment in the dist/ directory"
echo "🚀 The app can now be deployed with index.html at the root level"