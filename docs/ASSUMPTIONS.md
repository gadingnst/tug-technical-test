# Assumptions Made

During the development of the Wellness Platform, the following assumptions were made:

## 1. Authentication
- Session-based authentication is sufficient for the current scale.
- We use **Better Auth** as our authentication handler because it is easy to customize, manage, and scale.
- A key assumption is that the platform may need to support social logins (e.g., Google or other social media) in the future; Better Auth was selected specifically for its robust support and ease of integration for these features.
- Administrators will be manually seeded or created by other super-admins.

## 2. Infrastructure
- The platform will be deployed using Docker containers.
- A PostgreSQL database is always available and reachable via environment variables.

## 3. Data Integrity
- The shared Zod schemas are the source of truth for all data transferred between services.
- If a client (mobile or web) bypasses these schemas, the backend will reject the request.

## 4. Development Environment
- Developers use modern Node.js versions (v22+) and Docker Desktop.
- Hot-reloading is a requirement for a productive developer experience.

## 5. Security
- CORS is restricted to trusted origins defined in the configuration.
- Sensitive data (passwords, etc.) are never returned in API payloads excepts on admin creation (on internal requests).

## 6. Architecture
- **Modular Monorepo Architecture**: A modular approach using npm workspaces was deliberately chosen to cleanly separate concerns among the Backend (NestJS), Admin UI (React), and Mobile App (Flutter).
- **Shared Contracts**: By extracting schemas into `packages/shared-typescript`, both the backend and frontend can rely on a single source of truth for typing and data validation, reducing sync issues.
- **Independent Validation**: The modular structure allows each service to be developed, tested, and deployed independently while residing within a single repository for easier orchestration and unified dependency management.
```
