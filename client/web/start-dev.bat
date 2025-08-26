@echo off

echo Clearing cache...
rmdir /s /q node_modules\.vite 2>nul
rmdir /s /q .parcel-cache 2>nul
rmdir /s /q dist 2>nul

echo Setting Node memory options...
set NODE_OPTIONS=--max-old-space-size=4096

echo Starting development server with optimized settings...
npm run dev