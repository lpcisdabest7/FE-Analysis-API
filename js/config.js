// Configuration for Princess 3D Bot
class Config {
  constructor() {
    this.API_BASE_URL = this.env("API_BASE_URL", "http://localhost:3000");
    this.API_BACKEND_URL = this.env(
      "API_BACKEND_URL",
      "https://3d-model.earnai.art"
    );
    this.NODE_ENV = this.env("NODE_ENV", "development");

    // Animation settings
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
    this.AUTO_CONNECT_ENABLED = true;
    this.AUTO_CONNECT_DELAY = 1000;
  }

  env(name, defaultValue) {
    if (window.ENV && window.ENV[name]) return window.ENV[name];
    const urlParams = new URLSearchParams(window.location.search);
    const urlValue = urlParams.get(name.toLowerCase());
    return urlValue !== null ? urlValue : defaultValue;
  }

  log(...args) {
    console.log(...args);
  }
  warn(...args) {
    console.warn(...args);
  }
  error(...args) {
    console.error(...args);
  }
}

const config = new Config();
window.CONFIG = config;
