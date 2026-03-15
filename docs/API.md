# API Design

The Wellness Platform API is designed to be consistent, predictable, and strongly typed.

## Response Structure

Every API response follows a standardized envelope:

```typescript
{
  "success": boolean,    // Indicates if the operation was successful
  "message": string,     // A human-readable message
  "errors": string[],    // Detailed error messages (if any)
  "payload": T           // The data returned by the API (non-nullable)
}
```

- If `success` is `false`, `payload` will usually be an empty object `{}`.
- If `success` is `true`, `errors` will be an empty array `[]`.

## Authentication

We use **Better Auth** for secure, session-based authentication.

- **Endpoints**: All authentication endpoints are prefixed with `/api/auth`.
- **Guards**: Protected routes in the backend are secured using NestJS Guards (e.g., `AdminAuthGuard`).
- **Headers**: Standard session cookies are used to maintain authentication state.

## Resource Endpoints (Admin)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/admin/packages` | List all wellness packages |
| POST | `/admin/packages` | Create a new package |
| GET | `/admin/packages/:id` | Get details of a single package |
| PUT | `/admin/packages/:id` | Update an existing package |
| DELETE | `/admin/packages/:id` | Remove a package |

## Validation

Input validation is handled using **Zod** schemas. These schemas are shared between the frontend (`admin-portal`) and backend (`backend`) to ensure data integrity at both ends.
```
