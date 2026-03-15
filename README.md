# Wellness Platform Monorepo

Welcome to the Wellness Platform. This repository is a full-stack monorepo containing our backend services, admin dashboard, and mobile application.

## 📚 Documentation Hub

We have organized our documentation into focused modules to help you get started quickly:

- 🏗️ **[Project Structure](docs/STRUCTURE.md)**: Overview of the monorepo layout and components.
- ⚙️ **[Setup Instructions](docs/SETUP.md)**: How to get the project running locally and with Docker.
- 🏛️ **[Architectural Decisions](docs/ARCHITECTURE.md)**: Our technology stack and design patterns.
- 🔌 **[API Design](docs/API.md)**: Standardized response formats and authentication details.
- 🧠 **[Assumptions Made](docs/ASSUMPTIONS.md)**: Decisions made during development.
- 🐳 **[Docker Guide](docs/DOCKER.md)**: Deep dive into containerization and deployment.
- 🔐 **[Auth & Guards](docs/AUTH.md)**: Details on security and identity management.

## 🚀 Quick Start

If you're already familiar with the stack, here's the "cheat sheet":

```bash
# 1. Install
npm install

# 2. Build Core
npm run build:shared

# 3. Development
npm run dev:backend   # API on port 9100
npm run dev:admin     # Admin UI on port 3001
```

For a more robust experience (including hot-reload without local Node dependencies), run:
```bash
npm run docker:dev
```

## 🛠️ Tech Stack Highlights

- **Backend**: NestJS, Drizzle ORM, PostgreSQL, Better Auth.
- **Frontend**: React, TanStack (Router, Query), Vite, Tailwind CSS.
- **Mobile**: Flutter.
- **Shared**: Zod-based schemas for end-to-end type safety.
