# React SSR Project with Webpack, Express, React Query, and Leaflet

## Overview

This project is a **React Server-Side Rendering (SSR)** application built with **Webpack**, **Express**, **React Query**, and **Leaflet**. It was developed to showcase an efficient, scalable way to build full-stack applications with React, along with SSR for faster initial page loads and improved SEO. The application serves both the frontend React app and a mock backend API, while being containerized using **Docker**.

## Technologies Used

- **React**: For building the user interface.
- **React Query**: For efficient data fetching and caching.
- **Leaflet**: For interactive maps and geographical visualizations.
- **Webpack**: For bundling the React app with support for SSR.
- **Express**: To serve the React app and handle SSR on the server.
- **json-server**: For mocking a backend API during development.
- **TypeScript**: Migrated from JavaScript to TypeScript for better type safety and scalability.
- **Docker**: To containerize the application for easier deployment and scalability.

## How It Came Together

### 1. **Initial Setup**
We started with a basic React application setup. The app was initially just a client-side React app built with Webpack and using React Router for navigation. As the project grew, it became clear that **Server-Side Rendering (SSR)** would benefit the app by providing better SEO and faster initial loads.

### 2. **React SSR Implementation**
The SSR was set up using **Express** to render the React components on the server side. This allows the server to pre-render the HTML of the React app and send it to the client, instead of relying on the client to render everything on the fly.

### 3. **Adding React Query**
To handle asynchronous data fetching and state management, **React Query** was added to the app. React Query provides efficient ways to fetch, cache, and sync data in the application. This integration was key to managing the data needed for the app, including map data.

### 4. **Leaflet Integration**
For mapping functionality, **Leaflet** was used. This JavaScript library provides interactive maps, and it's integrated into the React components, allowing users to visualize geographical data.

### 5. **TypeScript Migration**
To improve code quality, **TypeScript** was introduced. The migration from JavaScript to TypeScript was gradual and started with the main server file (`server.tsx`). Types were defined for React components, hooks, and other parts of the app to improve maintainability and avoid runtime errors.

### 6. **Dockerization**
Once the app was ready, **Docker** was used to containerize the application. The Docker setup includes:

- A **multi-stage build** where the React app is built first in a separate container and then copied over to the production container.
- The production environment is set up to run both the React app (with SSR) and a mock API using **json-server** concurrently.
- **Nginx** was initially considered for serving the static files but later removed in favor of running everything via Node.js (Express).

### 7. **Mock API with json-server**
To simulate backend API calls during development, **json-server** was used. It runs alongside the React frontend and serves mock data, making it easier to develop and test the app without needing a real backend.

### 8. **Running the App Locally**
The app was configured to run both the frontend and backend concurrently using **concurrently**. This allows the developer to start the app and the mock API server with a single command (`npm run dev`).

### 9. **Production Deployment**
Docker was used to package the app for deployment. The Docker image contains both the React app and the mock API server, running in the same container. Once the Docker container is built, the app can be deployed to any platform that supports Docker (e.g., AWS, Heroku, DigitalOcean).

## Project Structure

