# Setup Instructions

Follow these steps to get the Wellness Platform running on your local machine.

## Prerequisites

- **Node.js**: v22 or later (includes `npm` with workspace support)
- **Docker**: Desktop or Engine with `docker-compose`
- **Flutter SDK**: SDK for developing the mobile app

## 1. Initial Installation

Clone the repository and install all dependencies from the root directory:

```bash
npm install
```

## 2. Environment Configuration

1.  **Backend**: Copy `apps/backend/.env.example` to `apps/backend/.env` and fill in your database credentials.
2.  **Admin Portal**: Copy `apps/admin-portal/.env.example` to `apps/admin-portal/.env` (if applicable).
3.  **Mobile App**: Ensure `.env` is configured for the Flutter app to point to your backend API.

## 3. Database Setup

Ensure your PostgreSQL database is running, then:

```bash
# Push schema to database
npm run drizzle:push

# (Optional) Seed the initial super admin
cd apps/backend
npm run seed:admin
```

## 4. Running the Applications

### Local Development (Native)

You need to build the shared package first:

```bash
npm run build:shared
```

Then run the services:

```bash
# Start Backend
npm run dev:backend

# Start Admin Portal
npm run dev:admin
```

### Development with Docker (Hot Reload)

If you prefer Docker for everything, use our dev-optimized compose file:

```bash
# From root
npm run docker:dev
```

This will automatically install dependencies inside the container and start both services with hot-reloading enabled.

### Production Build

```bash
npm run build:all
```
```
