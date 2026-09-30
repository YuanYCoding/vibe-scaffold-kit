# Project rules

- Use Node.js 24 and pnpm only.
- Keep TypeScript strict; never use `any` to bypass a design problem.
- Prefer Server Components. Add `use client` only for browser interaction.
- Validate every external input with Zod.
- Use Prisma only from server code; never import database code into a client component.
- PostgreSQL is the source of truth. Do not add Redis unless a measured need exists.
- Use Better Auth for user identity; do not create a second session system.
- Add an Alembic-like Prisma migration for every schema change; never use `db push` in production.
- Build UI with Tailwind CSS and the existing shadcn/ui Radix components in `src/components/ui`.
- Add shadcn/ui components with `pnpm dlx shadcn@latest add`; use semantic theme tokens instead of hard-coded colors.
- Run `pnpm check` and the relevant Playwright flow before completing a feature.
- Do not commit `.env`, database dumps, generated clients, uploads or credentials.
