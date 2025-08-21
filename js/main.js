// Main application controller
class PrincessBot {
  constructor() {
    this.princess3d = null;
    this.animationManager = null;
    this.actionQueue = null;
    this.apiClient = null;
    this.mockGenerator = null;
    this.audioUnlocked = false;

    this.elements = {};
    this.actionHistory = [];
    this.maxHistoryItems = config.MAX_HISTORY_ITEMS;

    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    config.log("🚀 Initializing Princess Bot...");

    // Get DOM elements
    this.elements = {
      canvas: document.getElementById("three-canvas"),
      connectionStatus: document.getElementById("connection-status"),
      currentAction: document.getElementById("current-action"),
      actionList: document.getElementById("action-list"),
      connectBtn: document.getElementById("connect-btn"),
      testActionBtn: document.getElementById("test-action-btn"),
      textInput: document.getElementById("text-input"),
      sendTextBtn: document.getElementById("send-text-btn"),
      textStatus: document.getElementById("text-status"),
      uiOverlay: document.getElementById("ui-overlay"),
      mobileToggle: document.getElementById("mobile-ui-toggle"),
    };

    // Initialize responsive state
    this.isMobile = window.innerWidth <= 480;
    this.isUIVisible = !this.isMobile;

    // Validate elements
    if (!this.elements.canvas) {
      console.error("❌ Canvas element not found!");
      return;
    }

    // Initialize 3D princess
    this.princess3d = new Princess3D(this.elements.canvas);

    // Initialize animation manager
    this.animationManager = new AnimationManager(this.princess3d);

    // Initialize action queue
    this.actionQueue = new ActionQueue(this.animationManager);

    // Initialize API client using configured backend URL
    this.apiClient = new ApiClient(config.API_BACKEND_URL);
    this.setupApiClientHandlers();

    // Initialize mock data generator
    this.mockGenerator = new MockDataGenerator();

    // Setup event listeners
    this.setupEventListeners();

    // Setup responsive handlers
    this.setupResponsiveHandlers();

    // Update UI
    this.updateConnectionStatus("disconnected");
    this.updateCurrentAction("Chờ hành động...");

    config.log("✅ Princess Bot initialized successfully!");

    // Auto-connect attempt
    if (config.AUTO_CONNECT_ENABLED) {
      setTimeout(() => {
        this.connectToBackend();
      }, config.AUTO_CONNECT_DELAY);
    }
  }

  setupApiClientHandlers() {
    this.apiClient.onAction((data) => {
      this.handleActionReceived(data);
    });

    this.apiClient.onStatus((status) => {
      this.updateConnectionStatus(status);
    });
  }

  setupEventListeners() {
    // Connect button
    if (this.elements.connectBtn) {
      this.elements.connectBtn.addEventListener("click", () => {
        this.connectToBackend();
      });
    }

    // Test action button
    if (this.elements.testActionBtn) {
      this.elements.testActionBtn.addEventListener("click", () => {
        this.testRandomAction();
      });
    }

    // Send text button
    if (this.elements.sendTextBtn) {
      this.elements.sendTextBtn.addEventListener("click", () => {
        this.sendTextInput();
      });
    }

    // Text input - Enter key
    if (this.elements.textInput) {
      this.elements.textInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          this.sendTextInput();
        }
      });
    }

    // Sample text buttons
    document.querySelectorAll(".sample-text-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = btn.dataset.text;
        if (this.elements.textInput) {
          this.elements.textInput.value = text;
          this.sendTextInput();
        }
      });
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (event) => {
      this.handleKeyboard(event);
    });

    // Unlock audio on first user interaction
    const unlockHandler = () => {
      this.unlockAudio();
      document.removeEventListener("click", unlockHandler);
      document.removeEventListener("keydown", unlockHandler);
      document.removeEventListener("touchstart", unlockHandler);
    };
    document.addEventListener("click", unlockHandler);
    document.addEventListener("keydown", unlockHandler);
    document.addEventListener("touchstart", unlockHandler);
  }

  setupResponsiveHandlers() {
    // Mobile UI toggle
    if (this.elements.mobileToggle) {
      this.elements.mobileToggle.addEventListener("click", () => {
        this.toggleMobileUI();
      });
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });

    // Handle orientation change
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        this.handleResize();
      }, 500);
    });

    // Close mobile UI when clicking outside
    document.addEventListener("click", (event) => {
      if (
        this.isMobile &&
        this.isUIVisible &&
        !this.elements.uiOverlay.contains(event.target) &&
        !this.elements.mobileToggle.contains(event.target)
      ) {
        this.hideMobileUI();
      }
    });

    // Handle touch events for better mobile experience
    if ("ontouchstart" in window) {
      this.setupTouchHandlers();
    }

    // Initial responsive setup
    this.updateResponsiveLayout();
    this.optimizeForMobile();
  }

  setupTouchHandlers() {
    // Prevent double-tap zoom on buttons
    document.querySelectorAll("button").forEach((button) => {
      button.addEventListener("touchstart", function (e) {
        e.preventDefault();
        this.focus();
      });
    });

    // Improve scrolling on mobile
    if (this.elements.actionList) {
      this.elements.actionList.addEventListener("touchstart", (e) => {
        e.stopPropagation();
      });
    }

    // Better input handling on mobile
    if (this.elements.textInput) {
      this.elements.textInput.addEventListener("focus", () => {
        // Add keyboard open class for layout adjustments
        document.body.classList.add("keyboard-open");

        // Scroll input into view on mobile
        setTimeout(() => {
          this.elements.textInput.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 300);
      });

      this.elements.textInput.addEventListener("blur", () => {
        // Remove keyboard open class
        setTimeout(() => {
          document.body.classList.remove("keyboard-open");
        }, 300);
      });
    }

    // Handle virtual keyboard resize on mobile
    if (this.isMobile && window.visualViewport) {
      window.visualViewport.addEventListener("resize", () => {
        this.handleVirtualKeyboard();
      });
    }
  }

  toggleMobileUI() {
    if (this.isUIVisible) {
      this.hideMobileUI();
    } else {
      this.showMobileUI();
    }
  }

  showMobileUI() {
    if (!this.elements.uiOverlay) return;

    this.isUIVisible = true;
    this.elements.uiOverlay.classList.remove("hidden");

    if (this.elements.mobileToggle) {
      this.elements.mobileToggle.classList.add("active");
      this.elements.mobileToggle.innerHTML = "✕";
      this.elements.mobileToggle.setAttribute("aria-label", "Close UI Panel");
    }
  }

  hideMobileUI() {
    if (!this.elements.uiOverlay) return;

    this.isUIVisible = false;
    this.elements.uiOverlay.classList.add("hidden");

    if (this.elements.mobileToggle) {
      this.elements.mobileToggle.classList.remove("active");
      this.elements.mobileToggle.innerHTML = "☰";
      this.elements.mobileToggle.setAttribute("aria-label", "Open UI Panel");
    }
  }

  handleResize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 480;

    // If switching between mobile and desktop
    if (wasMobile !== this.isMobile) {
      this.updateResponsiveLayout();
    }

    // Update 3D canvas size
    if (this.princess3d && this.princess3d.renderer) {
      this.princess3d.updateCanvasSize();
    }
  }

  updateResponsiveLayout() {
    if (!this.elements.uiOverlay) return;

    if (this.isMobile) {
      // Mobile layout
      this.elements.uiOverlay.classList.add("hidden");
      this.isUIVisible = false;

      if (this.elements.mobileToggle) {
        this.elements.mobileToggle.style.display = "block";
        this.elements.mobileToggle.classList.remove("active");
        this.elements.mobileToggle.innerHTML = "☰";
      }
    } else {
      // Desktop layout
      this.elements.uiOverlay.classList.remove("hidden");
      this.isUIVisible = true;

      if (this.elements.mobileToggle) {
        this.elements.mobileToggle.style.display = "none";
      }
    }
  }

  handleVirtualKeyboard() {
    if (!window.visualViewport || !this.isMobile) return;

    const viewport = window.visualViewport;
    const heightDifference = window.innerHeight - viewport.height;

    // If height difference is significant, virtual keyboard is likely open
    if (heightDifference > 150) {
      document.body.classList.add("keyboard-open");

      // Adjust UI overlay height
      if (this.elements.uiOverlay && this.isUIVisible) {
        this.elements.uiOverlay.style.maxHeight = `${viewport.height * 0.8}px`;
      }
    } else {
      document.body.classList.remove("keyboard-open");

      // Reset UI overlay height
      if (this.elements.uiOverlay) {
        this.elements.uiOverlay.style.maxHeight = "";
      }
    }
  }

  connectToBackend() {
    config.log("🔌 Attempting to connect to backend...");
    this.updateConnectionStatus("connecting");

    // Connect to API backend
    this.apiClient.connect();

    // If connection fails after configured delay, start mock data
    setTimeout(() => {
      if (!this.apiClient.isConnected) {
        config.log("⚠️ Backend connection failed, starting mock data...");
        this.startMockMode();
      }
    }, config.MOCK_CONNECTION_DELAY);
  }

  startMockMode() {
    this.updateConnectionStatus("mock");
    this.mockGenerator.start((actionData) => {
      this.handleActionReceived(actionData);
    }, config.MOCK_DATA_INTERVAL);
  }

  handleActionReceived(data) {
    config.log("🎯 Processing received action:", data);

    // If there is audio URL, play it
    if (data && data.urlAudio) {
      try {
        const audio = new Audio(data.urlAudio);
        audio.play().catch((e) => {
          config.warn("⚠️ Cannot auto-play audio:", e);
        });
      } catch (e) {
        config.warn("⚠️ Audio playback error:", e);
      }
    }

    let actions = [];

    if (data.actions && Array.isArray(data.actions)) {
      actions = data.actions;
    } else if (typeof data === "string") {
      // Parse string as action text
      actions = this.animationManager.parseActions(data);
    } else if (data.action) {
      actions = [data.action];
    } else {
      config.warn("⚠️ Unknown action format:", data);
      return;
    }

    // Add to history
    this.addToHistory(actions);

    // Update current action display
    this.updateCurrentAction(actions.join(", "));

    // Execute actions
    this.animationManager.executeActions(actions);
  }

  unlockAudio() {
    if (this.audioUnlocked) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) {
        this.audioUnlocked = true;
        return;
      }
      const ctx = new AudioCtx();
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      source.start(0);
      setTimeout(() => ctx.close().catch(() => {}), 0);
      this.audioUnlocked = true;
      config.log("🔓 Audio unlocked");
    } catch (e) {
      // Ignore unlock errors
      this.audioUnlocked = true;
    }
  }

  addToHistory(actions) {
    const historyItem = {
      actions: actions,
      timestamp: new Date(),
      id: Math.random().toString(36).substr(2, 9),
    };

    this.actionHistory.unshift(historyItem);

    // Keep only latest items
    if (this.actionHistory.length > this.maxHistoryItems) {
      this.actionHistory = this.actionHistory.slice(0, this.maxHistoryItems);
    }

    this.updateHistoryDisplay();
  }

  updateHistoryDisplay() {
    if (!this.elements.actionList) return;

    this.elements.actionList.innerHTML = "";

    this.actionHistory.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <strong>${item.actions.join(", ")}</strong>
                <br>
                <span class="timestamp">${this.formatTime(
                  item.timestamp
                )}</span>
            `;
      this.elements.actionList.appendChild(li);
    });
  }

  updateConnectionStatus(status) {
    if (!this.elements.connectionStatus) return;

    const statusMap = {
      connecting: { text: "Đang kết nối...", class: "connecting" },
      connected: { text: "✅ Đã kết nối", class: "connected" },
      disconnected: { text: "❌ Chưa kết nối", class: "disconnected" },
      reconnecting: { text: "🔄 Đang kết nối lại...", class: "connecting" },
      error: { text: "⚠️ Lỗi kết nối", class: "error" },
      failed: { text: "❌ Kết nối thất bại", class: "error" },
      mock: { text: "🎭 Chế độ demo", class: "mock" },
    };

    const statusInfo = statusMap[status] || statusMap["disconnected"];

    this.elements.connectionStatus.textContent = statusInfo.text;
    this.elements.connectionStatus.className = `connection-status ${statusInfo.class}`;

    // Update connect button
    if (this.elements.connectBtn) {
      this.elements.connectBtn.textContent =
        status === "connected" ? "Đã kết nối" : "Kết nối";
      this.elements.connectBtn.disabled = status === "connecting";
    }
  }

  updateCurrentAction(action) {
    if (!this.elements.currentAction) return;

    this.elements.currentAction.textContent = action;
    this.elements.currentAction.classList.add("active");

    // Remove active class after configured delay
    setTimeout(() => {
      this.elements.currentAction.classList.remove("active");
    }, config.STATUS_AUTO_CLEAR_DELAY);
  }

  testRandomAction() {
    const testActions = [
      ["nhảy múa"],
      ["vẫy tay"],
      ["cúi chào"],
      ["quay tròn"],
      ["nhảy lên"],
      ["nhảy múa", "vẫy tay"],
    ];

    const randomAction =
      testActions[Math.floor(Math.random() * testActions.length)];

    config.log("🎲 Testing random action:", randomAction);
    this.handleActionReceived({ actions: randomAction });
  }

  handleKeyboard(event) {
    // Keyboard shortcuts
    switch (event.key) {
      case "1":
        this.handleActionReceived({ actions: ["nhảy múa"] });
        break;
      case "2":
        this.handleActionReceived({ actions: ["vẫy tay"] });
        break;
      case "3":
        this.handleActionReceived({ actions: ["cúi chào"] });
        break;
      case "4":
        this.handleActionReceived({ actions: ["quay tròn"] });
        break;
      case "5":
        this.handleActionReceived({ actions: ["nhảy lên"] });
        break;
      case "t":
      case "T":
        this.testRandomAction();
        break;
      case "c":
      case "C":
        this.connectToBackend();
        break;
    }
  }

  formatTime(date) {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  // Public methods for external control
  executeAction(actionText) {
    const actions = this.animationManager.parseActions(actionText);
    this.handleActionReceived({ actions });
  }

  disconnect() {
    if (this.apiClient) {
      this.apiClient.disconnect();
    }
    if (this.mockGenerator) {
      this.mockGenerator.stop();
    }
    this.updateConnectionStatus("disconnected");
  }

  async sendTextInput() {
    const text = this.elements.textInput?.value?.trim();

    if (!text) {
      this.updateTextStatus("Vui lòng nhập văn bản", "error");
      return;
    }

    config.log("💬 Sending text input:", text);
    this.updateTextStatus("Đang xử lý...", "processing");
    this.elements.sendTextBtn.disabled = true;

    try {
      // Always send via API client
      const result = await this.apiClient.sendTextInput(text);
      if (result && result.success) {
        this.updateTextStatus("✅ Đã gửi lệnh", "success");
      } else {
        this.updateTextStatus("⚠️ Gửi không thành công", "error");
      }

      // Clear input after successful send
      this.elements.textInput.value = "";
    } catch (error) {
      config.error("❌ Error sending text:", error);
      this.updateTextStatus(`Lỗi: ${error.message}`, "error");
    } finally {
      this.elements.sendTextBtn.disabled = false;
    }
  }

  updateTextStatus(message, type = "default") {
    if (!this.elements.textStatus) return;

    this.elements.textStatus.textContent = message;
    this.elements.textStatus.className = `text-status ${type}`;

    // Auto-clear status after configured delay for success/error
    if (type === "success" || type === "error") {
      setTimeout(() => {
        this.elements.textStatus.textContent = "Sẵn sàng nhận lệnh...";
        this.elements.textStatus.className = "text-status";
      }, config.STATUS_AUTO_CLEAR_DELAY);
    }
  }

  // Responsive utilities
  getDeviceType() {
    const width = window.innerWidth;
    if (width <= 480) return "mobile";
    if (width <= 768) return "tablet-portrait";
    if (width <= 1024) return "tablet-landscape";
    return "desktop";
  }

  isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  // Performance optimization for mobile
  optimizeForMobile() {
    if (this.isMobile && this.princess3d) {
      // Reduce quality for better performance on mobile
      if (this.princess3d.renderer) {
        this.princess3d.renderer.setPixelRatio(
          Math.min(window.devicePixelRatio, 2)
        );
      }
    }
  }

  // Cleanup
  destroy() {
    this.disconnect();

    // Remove event listeners
    if (this.elements.mobileToggle) {
      this.elements.mobileToggle.removeEventListener(
        "click",
        this.toggleMobileUI
      );
    }

    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("orientationchange", this.handleResize);

    if (window.visualViewport) {
      window.visualViewport.removeEventListener(
        "resize",
        this.handleVirtualKeyboard
      );
    }
  }
}

// Initialize the application when page loads
let princessBot;

// Start the application
document.addEventListener("DOMContentLoaded", () => {
  princessBot = new PrincessBot();
});

// Make it globally available for debugging
window.princessBot = princessBot;

// Handle page unload
window.addEventListener("beforeunload", () => {
  if (princessBot) {
    princessBot.destroy();
  }
});
