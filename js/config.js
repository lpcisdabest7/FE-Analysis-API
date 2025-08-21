// Simple configuration for Princess 3D Bot
class Config {
  constructor() {
    this.loadConfig();
  }

  loadConfig() {
    // API Configuration (from environment)
    this.API_BASE_URL = this.env("API_BASE_URL", "http://localhost:3000");
    this.API_BACKEND_URL = this.env("API_BACKEND_URL", "http://localhost:3005");

    // Fixed settings (hardcoded)
    this.ANIMATION_DURATION = 3000;
    this.ANIMATION_CHAIN_DELAY = 3000;
    this.MOCK_DATA_INTERVAL = 7000;
    this.MOCK_CONNECTION_DELAY = 5000;
    this.MAX_HISTORY_ITEMS = 10;
    this.STATUS_AUTO_CLEAR_DELAY = 3000;
    this.SCENE_BACKGROUND_COLOR = "#87ceeb";
    this.CAMERA_FOV = 75;
    this.CAMERA_NEAR = 0.1;
    this.CAMERA_FAR = 1000;
    this.DEBUG_MODE = false;
    this.ENABLE_CONSOLE_LOGS = true;
    this.AUTO_CONNECT_ENABLED = true;
    this.AUTO_CONNECT_DELAY = 1000;

    // Production Settings (from environment)
    this.NODE_ENV = this.env("NODE_ENV", "development");
    this.IS_PRODUCTION = this.NODE_ENV === "production";

    if (this.ENABLE_CONSOLE_LOGS) {
      console.log("✅ Config loaded:", {
        NODE_ENV: this.NODE_ENV,
        API_BACKEND_URL: this.API_BACKEND_URL,
      });
    }
  }

  // Simple environment variable getter
  env(name, defaultValue) {
    // Check window.ENV first (set by env.js)
    if (typeof window !== "undefined" && window.ENV && window.ENV[name]) {
      return window.ENV[name];
    }

    // Check URL params for quick testing
    if (
      typeof URLSearchParams !== "undefined" &&
      typeof window !== "undefined"
    ) {
      const urlParams = new URLSearchParams(window.location.search);
      const urlValue = urlParams.get(name.toLowerCase());
      if (urlValue !== null) return urlValue;
    }

    return defaultValue;
  }

  // Logging helpers
  log(...args) {
    if (this.ENABLE_CONSOLE_LOGS) console.log(...args);
  }

  warn(...args) {
    if (this.ENABLE_CONSOLE_LOGS) console.warn(...args);
  }

  error(...args) {
    console.error(...args);
  }
}

// Create and export global configuration
const config = new Config();

// Make globally available
if (typeof window !== "undefined") {
  window.CONFIG = config;
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = config;
}
