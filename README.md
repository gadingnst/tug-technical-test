# Wellness Platform Monorepo

This monorepo contains three projects for the Wellness platform.

## Structure

```
tug-technical-test/
├── apps/
│   ├── wellness-core-backend/    # NestJS + Drizzle ORM + PostgreSQL
│   ├── wellness-admin/           # React + Vite + TanStack Router
│   └── wellness-app/             # Flutter
├── packages/
│   └── shared-typescript/        # Zod schemas + TS types
└── package.json                  # npm workspaces root
```

## Getting Started

```bash
# Install all dependencies
npm install

# Build shared package (required before backend/admin)
npm run build:shared

# Build everything
npm run build:all
```

## Development

```bash
# Backend (NestJS on port 9100)
npm run dev:backend

# Admin Panel (Vite on port 3001)
npm run dev:admin

# Flutter App
cd apps/wellness-app && flutter pub get && flutter run
```

## Docker

For running the stack in Docker, please refer to the comprehensive guide:
👉 **[Docker Setup & Deployment Guide](docs/DOCKER.md)**

For details on the authentication module and admin access:
👉 **[Authentication & Guarding Details](docs/AUTH.md)**

To start development environment with **Hot Reload**:
```bash
npm run docker:dev
```

## Database

```bash
# Push Drizzle schema to DB
cd apps/wellness-core-backend
npm run drizzle:push

# Generate migration
npm run drizzle:generate

# Run migrations
npm run drizzle:migrate

# Seed initial Super Admin
npm run seed:admin
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/admin/packages` | List all wellness packages |
| POST | `/admin/packages` | Create a wellness package |
| PUT | `/admin/packages/:id` | Update a wellness package |
| DELETE | `/admin/packages/:id` | Delete a wellness package |
