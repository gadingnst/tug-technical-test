# Docker Setup & Deployment Guide

This document explains how to run the applications within this monorepo using Docker. You can choose to run the entire stack together for local testing, or build and deploy them completely isolated for production environments.

## 1. Running Together (Local Development)

To spin up both the **Wellness Admin Frontend** and the **Wellness Core Backend** simultaneously, we use the root-level `docker-compose.yml` file. This approach is ideal for local development, integration testing, and quick previews.

### Prerequisites
- Docker and Docker Compose installed
- Your external Database running (configured within the root `docker-compose.yml` via environment variables)

### Commands
Navigate to the root directory of the project and start the cluster:

```bash
docker-compose up -d --build
```

### Accessing the Services
- **Admin Dashboard:** `http://localhost:3001`
- **Core Backend APIs:** `http://localhost:9100`

To stop the services safely, run:
```bash
docker-compose down
```

---

## 2. Running for Development (Hot Reloading)

If you are actively developing and want changes to immediately reflect without rebuilding images, we have configured a specific development override. This uses native `node:22-alpine` images and mounts your local source code into the containers.

### Commands
From the project root, simply execute the convenience script:

```bash
npm run docker:dev
```
*(Under the hood, this runs `docker-compose -f docker-compose.dev.yml up`)*

This boots both services and executes `npm run dev:backend` and `npm run dev:admin`. Any changes you make to the source code locally will automatically trigger a reload inside the containers!

---

## 3. Running Separately (Real Deployment & CI/CD)

For real production deployment scenarios, you should not load your entire monorepo into the build context to run one service. Instead, you should build independent, isolated images for your frontend and backend. 

### Isolated Build Scripts
We have provided dedicated shell scripts to handle isolated builds. These scripts dynamically create a clean, temporary build context. They securely copy the root `package.json`, the shared `packages/` directory, and ONLY the specific application code you want to build—completely ignoring the rest of the workspace.

#### Building the Backend Image
From the root directory, execute:

```bash
./apps/wellness-core-backend/build-docker-image.sh
```
*Result: Builds the `wellness-core-backend` Docker image exposing port 9100.*

#### Building the Admin Frontend Image
From the root directory, execute:

```bash
./apps/wellness-admin/build-docker-image.sh
```
*Result: Builds the `wellness-admin` Docker image using Nginx exposing port 80.*

### Production Deployment Strategy

Once the images are built via these isolated scripts, they no longer rely on the monorepo structure. You can deploy them as standard standalone containers.

1. **Container Registry**: Tag the generated images and push them to your preferred registry (Docker Hub, AWS ECR, GCP Artifact Registry).
2. **Deploying the Backend**: Run the `wellness-core-backend` container on your backend infrastructure. Make sure to pass production environment variables directly to the container (`DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`). 
3. **Deploying the Frontend**: Run the `wellness-admin` container on your web infrastructure. It runs a lightweight Nginx server and exposes port `80` by default.

Because they are fully decoupled, you can now scale, update, and manage the deployment of your frontend separately from your backend.
