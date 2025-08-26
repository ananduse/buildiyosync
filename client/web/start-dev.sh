#!/bin/bash

# Clear cache and temp files
echo "Clearing cache..."
rm -rf node_modules/.vite
rm -rf .parcel-cache 2>/dev/null
rm -rf dist 2>/dev/null

# Set Node options for better memory management
export NODE_OPTIONS="--max-old-space-size=4096"

# Start dev server
echo "Starting development server with optimized settings..."
npm run dev