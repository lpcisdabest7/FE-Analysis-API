class ApiClient {
  constructor(baseUrl = config.API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.onActionReceived = null;
    this.onStatusChange = null;
  }

  async analyzeText(text) {
    try {
      config.log("📝 Analyzing text via API:", text);
      this.updateStatus("analyzing");

      const response = await fetch(`${this.baseUrl}/api/action/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      config.log("🎯 Received action from API:", res);

      // Normalize backend payload { data: { action, urlAudio, textInput }, timestamp }
      const payload = res && res.data ? res.data : res;

      const actionData = {
        action: payload.action,
        actions:
          payload.actions || (payload.action ? [payload.action] : undefined),
        urlAudio: payload.urlAudio,
        textInput: payload.textInput || payload.originalText,
        timestamp: new Date(res.timestamp || Date.now()),
        type: "api-response",
        success: true,
      };

      this.updateStatus("completed");
      this.handleActionReceived(actionData);

      return actionData;
    } catch (error) {
      config.error("❌ API Error:", error);
      this.updateStatus("error");

      // Return error response in expected format
      const errorData = {
        action: "idle",
        actions: ["idle"],
        originalText: text,
        gptMessage: "Error occurred during analysis",
        timestamp: new Date(),
        type: "error",
        success: false,
        error: error.message,
      };

      this.handleActionReceived(errorData);
      return errorData;
    }
  }

  async healthCheck() {
    try {
      const response = await fetch(`${this.baseUrl}/api/actions/health`);
      const data = await response.json();
      config.log("❤️ Health check:", data);
      return data;
    } catch (error) {
      config.error("❌ Health check failed:", error);
      return { status: "error", error: error.message };
    }
  }

  handleActionReceived(data) {
    if (this.onActionReceived) {
      this.onActionReceived(data);
    }
  }

  updateStatus(status) {
    if (this.onStatusChange) {
      this.onStatusChange(status);
    }
  }

  // Event handlers
  onAction(callback) {
    this.onActionReceived = callback;
  }

  onStatus(callback) {
    this.onStatusChange = callback;
  }

  // Test method to send text input (compatible with existing frontend code)
  sendTextInput(text) {
    return this.analyzeText(text);
  }

  // Mock connection methods for compatibility
  connect() {
    config.log("🔌 API Client ready");
    this.updateStatus("connected");
    return Promise.resolve();
  }

  disconnect() {
    config.log("🔌 API Client disconnected");
    this.updateStatus("disconnected");
  }

  get isConnected() {
    return true; // API client is always "connected" if network is available
  }
}

// Mock data generator for testing (same as WebSocket version)
class MockDataGenerator {
  constructor() {
    this.actions = [
      { actions: ["nhảy múa"] },
      { actions: ["vẫy tay"] },
      { actions: ["cúi chào"] },
      { actions: ["quay tròn"] },
      { actions: ["nhảy lên"] },
      { actions: ["nhảy múa", "vẫy tay"] },
      { actions: ["cúi chào", "quay tròn"] },
    ];
    this.isRunning = false;
    this.interval = null;
  }

  start(callback, intervalMs = 5000) {
    if (this.isRunning) return;

    this.isRunning = true;
    config.log("🎭 Starting mock data generator...");

    this.interval = setInterval(() => {
      const randomAction =
        this.actions[Math.floor(Math.random() * this.actions.length)];
      config.log("🎲 Generated mock action:", randomAction);
      callback(randomAction);
    }, intervalMs);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.isRunning = false;
    config.log("⏹️ Mock data generator stopped");
  }
}
