# Authentication

This project uses [Better Auth](https://better-auth.com/) for handling authentication and authorization across the application. 

## Architecture

We use a hybrid approach that leverages Better Auth's powerful session management while keeping a clear separation of concerns for domain-specific tables.

1. **Standard Users & Sessions**: Handled automatically by Better Auth's built-in tables (`user`, `session`, `account`, `verification`).
2. **Admin Management**: We use Better Auth's `admin()` plugin to assign the `admin` role, but we also maintain our own custom `admins` table which references the Better Auth `user.id`. This allows us to store admin-specific domain relationships in the future without bloating the core authentication table.

## Guarding Endpoints

All admin endpoints (mounted under `/admin/*`) are protected using the `AdminAuthGuard`.

### How it works:
1. The client sends a request with the `Authorization: Bearer <token>` header. (This token is returned via the `set-auth-token` header during login).
2. The `AdminAuthGuard` validates the token against Better Auth.
3. The guard checks if the user has the `admin` role assigned by Better Auth *or* if their User ID exists in our custom `admins` table.
4. If valid, the request proceeds, and `req.user` & `req.session` are populated for downstream controllers.

## API Usage

1. **Standard Login**
   - `POST /admin/auth/login`
   - Payload: `{ "email": "admin@example.com", "password": "..."}`
   - *Note: the token is returned in the JSON response as well as the `set-auth-token` header.*

2. **Managing Admins (Requires Auth)**
   - `GET /admin/admins` - List all admin IDs
   - `POST /admin/admins` - Create a new admin. Body: `{ "email": "..." }`. Will return a generated password.
   - `POST /admin/admins/upgrade` - Upgrade an existing user to admin. Body: `{ "userId": "..." }`.

## Initialization
To initialize your local environment with the very first Super Admin:
```bash
# Ensure migrations are applied
npm run drizzle:migrate
npm run seed:admin
```
This will create `account@gading.dev` and print its randomly generated secure password to the console.
