# Multi-stage build for Princess 3D Bot
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create environment file from example if not exists
RUN cp env.example .env || true

# Production stage
FROM nginx:alpine AS production

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=builder /app /usr/share/nginx/html

# Copy environment template for runtime configuration
COPY --from=builder /app/env.example /usr/share/nginx/html/

# Create startup script for environment variable injection
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'set -e' >> /docker-entrypoint.sh && \
    echo '' >> /docker-entrypoint.sh && \
    echo '# Generate env.js from environment variables' >> /docker-entrypoint.sh && \
    echo 'cat > /usr/share/nginx/html/env.js << EOF' >> /docker-entrypoint.sh && \
    echo 'window.ENV_CONFIG = {' >> /docker-entrypoint.sh && \
    echo '  NODE_ENV: "${NODE_ENV:-production}",' >> /docker-entrypoint.sh && \
    echo '  API_BASE_URL: "${API_BASE_URL:-http://localhost:3000}",' >> /docker-entrypoint.sh && \
    echo '  API_BACKEND_URL: "${API_BACKEND_URL:-http://localhost:3005}",' >> /docker-entrypoint.sh && \
    echo '  NODE_ENV: "${NODE_ENV:-production}"' >> /docker-entrypoint.sh && \
    echo '};' >> /docker-entrypoint.sh && \
    echo 'EOF' >> /docker-entrypoint.sh && \
    echo '' >> /docker-entrypoint.sh && \
    echo '# Start nginx' >> /docker-entrypoint.sh && \
    echo 'exec nginx -g "daemon off;"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

# Update HTML to include env.js
RUN sed -i '/<script src="js\/env-loader.js"><\/script>/a\    <script src="env.js"></script>' /usr/share/nginx/html/index.html

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start with custom entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]
