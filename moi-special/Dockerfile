# STAGE 1: Build Angular Frontend Application
FROM node:20-alpine AS build
WORKDIR /app

# Copy package descriptors and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build production bundle
COPY . .
RUN npm run build

# STAGE 2: Serve Bundle with Nginx Alpine
FROM nginx:alpine AS final

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular static assets to Nginx html directory
COPY --from=build /app/dist/moi-special/browser /usr/share/nginx/html

# Copy custom Nginx configuration for SPA routing & reverse proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
