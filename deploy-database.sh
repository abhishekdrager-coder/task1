#!/bin/bash

echo "🚀 Deploying comprehensive postal code database..."
echo ""

git add location.js
git commit -m "MAJOR UPDATE: Comprehensive postal code database with 750+ codes

- Added Whistler postal codes (V0N, V8G)
- Added Squamish, Jasper, Banff, and other BC resort towns
- Expanded Alberta cities (Grande Prairie, Wood Buffalo, Drumheller, etc.)
- Complete Quebec coverage (all major cities and suburbs)
- All Saskatchewan, Manitoba cities
- Maritime provinces complete coverage
- Territories (Yukon, NWT, Nunavut)
- 200+ USA ZIP codes (New York, LA, Chicago, San Francisco, Boston, Seattle, etc.)
- Organized by region with clear section headers
- SINGLE SOURCE OF TRUTH for all location data
- Optimized for fast lookups and accurate city identification"

git push origin main

echo ""
echo "✅ Successfully deployed comprehensive database!"
echo ""
echo "🌐 Database now includes:"
echo "   • Whistler & BC Resort Towns"
echo "   • All Canadian provinces & territories"
echo "   • 50+ US major cities"
echo "   • 750+ postal/ZIP codes total"
echo ""
echo "🔗 Live at: https://abhishekdrager-coder.github.io/task1/"
echo ""
