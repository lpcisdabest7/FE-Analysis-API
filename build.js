#!/usr/bin/env node

// Build script for Vercel deployment
// This script generates env.js from environment variables

const fs = require("fs");
const path = require("path");

console.log("🔧 Building Princess 3D Bot for Vercel...");

// Get environment variables
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
const API_BACKEND_URL = process.env.API_BACKEND_URL || "http://localhost:3005";
const NODE_ENV = process.env.NODE_ENV || "production";

// Generate env.js content
const envContent = `// Auto-generated environment configuration
window.ENV_CONFIG = {
  API_BASE_URL: "${API_BASE_URL}",
  API_BACKEND_URL: "${API_BACKEND_URL}",
  NODE_ENV: "${NODE_ENV}"
};

console.log("🌍 Environment loaded from Vercel:", window.ENV_CONFIG);
`;

// Write env.js file
const envPath = path.join(__dirname, "env.js");
fs.writeFileSync(envPath, envContent);

console.log("✅ Environment file generated:", envPath);
console.log("📝 Environment variables:");
console.log(`   API_BASE_URL: ${API_BASE_URL}`);
console.log(`   API_BACKEND_URL: ${API_BACKEND_URL}`);
console.log(`   NODE_ENV: ${NODE_ENV}`);

// Update index.html to include env.js
const indexPath = path.join(__dirname, "index.html");
let indexContent = fs.readFileSync(indexPath, "utf8");

// Check if env.js is already included
if (!indexContent.includes('<script src="env.js"></script>')) {
  // Add env.js script after env-loader.js
  indexContent = indexContent.replace(
    '<script src="js/env-loader.js"></script>',
    '<script src="js/env-loader.js"></script>\n    <script src="env.js"></script>'
  );

  fs.writeFileSync(indexPath, indexContent);
  console.log("✅ Updated index.html to include env.js");
} else {
  console.log("ℹ️ env.js already included in index.html");
}

console.log("🚀 Build completed successfully!");
