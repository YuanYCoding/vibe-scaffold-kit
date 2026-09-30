# Architecture

`apps/web` is the Next.js user interface. `apps/api` is one NestJS + Fastify modular monolith with REST/OpenAPI. `apps/worker` consumes BullMQ jobs. `packages/contracts` owns Zod boundary schemas and `packages/db` owns Prisma/PostgreSQL.

The API and worker may scale independently, but they remain one product and one database. Redis is used only for queues, caching and coordination. Add an outbox table before a database write must reliably publish an external side effect.

Authentication is deliberately a boundary decision: use Better Auth when the first identity requirement arrives, keep its server session authoritative, and make the API validate a documented internal/session credential. Do not invent a second JWT system.
