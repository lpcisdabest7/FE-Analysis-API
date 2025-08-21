#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🔧 Building for Vercel...");

// Environment variables
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
const API_BACKEND_URL = process.env.API_BACKEND_URL || "http://localhost:3005";
const NODE_ENV = process.env.NODE_ENV || "production";

// Generate env.js
const envContent = `window.ENV_CONFIG = {
  API_BASE_URL: "${API_BASE_URL}",
  API_BACKEND_URL: "${API_BACKEND_URL}",
  NODE_ENV: "${NODE_ENV}"
};`;

fs.writeFileSync(path.join(__dirname, "env.js"), envContent);
console.log("✅ Build completed!");
