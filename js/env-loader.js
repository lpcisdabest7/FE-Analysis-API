// Simple environment variable loader for domains only
(function () {
  "use strict";

  // Initialize ENV object
  window.ENV = window.ENV || {};

  function loadEnvironment() {
    // Load from external env.js file (if exists)
    if (typeof window.ENV_CONFIG === "object") {
      Object.assign(window.ENV, window.ENV_CONFIG);
    }

    // Set defaults for domain settings only
    const defaults = {
      NODE_ENV: "development",
      API_BASE_URL: "http://localhost:3000",
      API_BACKEND_URL: "http://localhost:3005",
    };

    // Apply defaults
    for (const [key, defaultValue] of Object.entries(defaults)) {
      if (!window.ENV.hasOwnProperty(key)) {
        window.ENV[key] = defaultValue;
      }
    }

    console.log("🌍 Environment loaded:", window.ENV);
  }

  // Load when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadEnvironment);
  } else {
    loadEnvironment();
  }
})();
