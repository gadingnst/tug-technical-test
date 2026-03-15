# Architectural Decisions

This document outlines the core technical decisions and patterns used in the Wellness Platform.

## Monorepo Strategy (npm Workspaces)

We chose a monorepo structure to:
- Share code (schemas, types, helpers) between projects easily.
- Manage all dependencies in one place.
- Keep the entire stack (Frontend, Backend, Mobile) in sync.

## Backend: NestJS + Drizzle ORM

- **NestJS**: Provides a structured, modular architecture for the API, making it easy to scale and maintain.
- **Drizzle ORM**: Used for database interactions. It provides "Typescript-first" database management with full type safety and a lightweight footprint compared to heavy ORMs like TypeORM or Prisma.
- **PostgreSQL**: Selected as the primary relational database for its reliability and performance.

## Frontend: React + TanStack Suite

- **TanStack Router**: Used for its excellent Type-Safe routing capabilities.
- **TanStack Query**: Used for efficient data fetching, caching, and state synchronization with the API.
- **Vite**: Provides an extremely fast build tool and development server.

## Shared Schema (Zod)

Instead of manually maintaining types in both the frontend and backend, we use **Zod** in a shared package. 
- Validation happens on the API layer using these schemas.
- TypeScript types are inferred from these schemas for use in the frontend.
- This ensures that if a field changes in the backend, the frontend build will fail if not updated.

## Deployment: Docker

Each application has its own `Dockerfile` designed for isolated production builds. We use multi-stage builds to keep production images small and secure.
```
