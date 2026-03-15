# Project Structure

This monorepo is organized using **npm workspaces**. It contains applications and shared packages designed to work together seamlessly.

## Directory Layout

```text
tug-technical-test/
├── apps/
│   ├── admin-portal/       # React + Vite + TanStack Router (Admin UI)
│   ├── backend/            # NestJS + Drizzle ORM + Better Auth (API)
│   └── mobile-app/         # Flutter (Mobile Client)
├── packages/
│   └── shared-typescript/  # Core Zod schemas and TypeScript types
├── docs/                   # Full documentation suite
├── docker-compose.yml      # Production-like orchestration
└── docker-compose.dev.yml  # Development orchestration with hot-reload
```

## Component Roles

### 1. Applications (`apps/`)

- **`admin-portal`**: A modern web application for administrators to manage the platform. Built with React and TanStack Router for type-safe routing.
- **`backend`**: The central API service. Handles authentication, database interactions, and business logic.
- **`mobile_app`**: Flutter-based mobile application for end-users.

### 2. Shared Packages (`packages/`)

- **`shared-typescript`**: This is a critical package that ensures type safety across the entire TypeScript stack (Backend and Admin Portal). It contains Zod schemas used for both validation in the backend and type definitions in the frontend.

### 3. Documentation (`docs/`)

- Contains detailed guides on setup, API design, architecture, and deployment.
```
