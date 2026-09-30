# Project rules

- Use Node.js 24, pnpm and Turborepo. Never add npm or yarn lockfiles.
- Keep TypeScript strict and validate external input with shared Zod contracts.
- `apps/web` owns presentation, `apps/api` owns business rules, `apps/worker` owns background jobs.
- Build Web UI with Tailwind CSS and the shadcn/ui Radix components in `apps/web/src/components/ui`.
- Run shadcn/ui CLI from `apps/web`; use semantic theme tokens instead of hard-coded colors.
- Controllers parse HTTP and call services. Do not grow business logic in controllers.
- Access Prisma through `packages/db`; do not issue ad-hoc database calls from React components.
- PostgreSQL is the source of truth. Redis and BullMQ are rebuildable infrastructure.
- Queue payloads contain IDs and small primitives, never credentials or large objects.
- Use REST + OpenAPI for public contracts. Update the contract and tests together.
- Start as a modular monolith. Do not introduce microservices, Kafka or Kubernetes without measured need.
- Add migrations for schema changes and keep them backward compatible during rolling deployment.
- Run `pnpm check` and the relevant Playwright test before completion.
- Never commit `.env`, credentials, dumps, uploads or generated Prisma clients.
