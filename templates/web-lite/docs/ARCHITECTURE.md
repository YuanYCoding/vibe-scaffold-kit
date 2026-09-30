# Architecture

This is a Next.js modular monolith. Server Components and Route Handlers own server work; Client Components own browser interaction. Prisma is the only business database adapter, PostgreSQL is the source of truth, and Better Auth owns identity and sessions.

Create feature folders under `src/features/<feature>`. Keep validation, service logic and data access separate even when they live in the same application. Split out a standalone API only after the project has multiple clients, many workers, or an independent scaling requirement.
