// Environment loader
(function () {
  window.ENV = window.ENV || {};

  function loadEnvironment() {
    if (window.ENV_CONFIG) {
      Object.assign(window.ENV, window.ENV_CONFIG);
    }

    const defaults = {
      NODE_ENV: "development",
      API_BASE_URL: "http://localhost:3000",
      API_BACKEND_URL: "http://localhost:3005",
    };

    for (const [key, defaultValue] of Object.entries(defaults)) {
      if (!window.ENV[key]) {
        window.ENV[key] = defaultValue;
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadEnvironment);
  } else {
    loadEnvironment();
  }
})();
