# Step 1: Build the React app
FROM node:22.12.0-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json separately for better caching
COPY package.json ./

# Ensure a clean install of dependencies
RUN rm -rf node_modules package-lock.json && npm cache clean --force
RUN npm install --force

# Install TypeScript globally
RUN npm install -g typescript

# Install concurrently to run multiple processes
RUN npm install concurrently --force
RUN rm -rf ./src
# Copy the rest of the application files
COPY . .

# Install dependencies using npm ci only if package-lock.json exists
RUN [ -f package-lock.json ] && npm ci --legacy-peer-deps || echo "No package-lock.json found, skipping npm ci"

# Build the React app for production
RUN npm run build

# Step 2: Set up the production environment for Node.js
FROM node:22.12.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the backend code and the build output (from the build stage)
COPY --from=build /app/dist /app/dist
COPY --from=build /app/public /app/public

# Copy package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./

# Expose the ports for the React app (frontend) and the JSON server (backend)
EXPOSE 3000 3001

# Command to start both the backend server (json-server) and the React app
CMD ["npm", "run", "dev"]