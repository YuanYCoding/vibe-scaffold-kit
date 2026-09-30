# Bundled scaffold catalog

This file describes the only three templates this Skill may instantiate.

## Generator contract

- Plugin root: the directory containing `plugin.json`, `package.json`, `create.mjs`, and `templates/`; resolve it relative to the installed Skill as described in `SKILL.md`.
- Command: `pnpm --dir <plugin-root> scaffold <template> <project-name> --output <parent-directory>`.
- Valid templates: `web-lite`, `ts-platform`, `ai-platform`.
- Project names must match `^[a-z][a-z0-9-]{1,62}$`.
- The destination must not exist or must be empty with explicit `--force`; never use `--force` for a non-empty directory.
- Default behavior installs dependencies, generates the initial database client where applicable, initializes Git, stages generated files, creates `.env` from `.env.example`, and generates local secrets.
- Optional flags: `--no-install`, `--no-git`, `--force`.

Before creating, verify the plugin root, `package.json`, `create.mjs`, and the selected template directory still exist. If the implementation has drifted from this catalog, inspect its `README.md` and `docs/DECISIONS.md` and follow the current code.

## Shared baseline

All three templates use:

- PostgreSQL as the source of business truth, with schema migrations committed to Git;
- Next.js, React, TypeScript, Tailwind CSS 4, and shadcn/ui Radix Nova for the Web UI;
- Zod or Pydantic validation at external boundaries;
- Docker Compose for local infrastructure, automated tests, health checks, GitHub Actions, and project-specific `AGENTS.md` guidance.

Database contents, `.env`, credentials, uploads, and generated runtime data do not belong in Git.

## `web-lite`

Choose for an MVP, content product, membership site, internal CRUD tool, simple admin, or straightforward SaaS with one primary Web client and modest API/background-work needs.

Stack:

- Next.js App Router full-stack application and React Server Components;
- Route Handlers for server endpoints;
- Prisma with PostgreSQL migrations;
- Better Auth for identity and sessions;
- React Hook Form, TanStack Query, Zod, Vitest, and Playwright;
- no Redis or dedicated Worker by default.

Prefer it when keeping product UI, server behavior, authentication, and data access in one application is more valuable than independent API scaling. Do not choose it for heavy crawling, several long-running workers, a public multi-client API, or a Python-native data workload.

## `ts-platform`

Choose for a larger all-TypeScript product with a separately deployable API, multiple clients, complex permissions, payments, public REST contracts, scheduled jobs, or reliable background processing.

Stack:

- pnpm and Turborepo monorepo;
- Next.js Web application;
- NestJS with Fastify, REST, and OpenAPI;
- shared Zod contracts;
- Prisma and PostgreSQL;
- Redis and BullMQ Worker;
- Vitest and Playwright.

Prefer it when API and Worker boundaries are needed but Python-specific libraries are not central. Keep it a modular monolith; the template does not justify microservices, Kafka, or Kubernetes by itself.

## `ai-platform`

Choose when the core workload depends on Python AI/data libraries, substantial LLM or RAG pipelines, crawling/scraping, quantitative analysis, NLP/computer vision, document processing, or long-running retryable tasks.

Stack:

- Next.js Web application;
- FastAPI and versioned REST/OpenAPI;
- Pydantic and SQLAlchemy 2 async data access;
- Alembic migrations and psycopg 3 for PostgreSQL;
- Celery Workers with Redis transport;
- uv, Ruff, mypy, pytest, Vitest, and Playwright.

Prefer it when Python is part of the product's core execution path. A normal CRUD application that merely calls a hosted LLM API can still remain `web-lite`; do not accept the operational cost of a separate Python API and Worker without a real workload need.

## Tie-breakers

1. Python-native crawling, AI, or data processing is core: `ai-platform`.
2. Otherwise, independent API/Worker scaling, multiple clients, public API, or complex background work is required: `ts-platform`.
3. Otherwise: `web-lite`.

Prefer the smallest template that satisfies the stated near-term requirements. Select for evidence-backed needs, not hypothetical scale. If a key future requirement is both likely and expensive to migrate later, include it explicitly in the tradeoff discussion.

## Expected handoff commands

After successful creation, report these without automatically running them:

```bash
cd <absolute-project-path>
docker compose up -d postgres
pnpm db:deploy
pnpm dev
```

For `ts-platform` and `ai-platform`, the Compose command also includes Redis:

```bash
docker compose up -d postgres redis
```
