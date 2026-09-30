# Project rules

- Use Node.js 24/pnpm for Web and Python 3.11/uv for API and workers.
- `apps/web` owns presentation. `apps/api` owns API, domain rules, persistence and task definitions.
- Build Web UI with Tailwind CSS and the shadcn/ui Radix components in `apps/web/src/components/ui`.
- Run shadcn/ui CLI from `apps/web`; use semantic theme tokens instead of hard-coded colors.
- Keep FastAPI routes thin; put business logic in feature services and database access in repositories.
- Use Pydantic for every external boundary and SQLAlchemy 2 async sessions for request-time database work.
- PostgreSQL is the source of truth. Redis/Celery transport must be rebuildable.
- Celery payloads contain IDs and small primitives, never credentials, ORM objects or large documents.
- Tasks must be idempotent and safe to retry. Persist important task state in PostgreSQL.
- Use Alembic for every schema change; never call `create_all()` in production.
- Keep network requests outside long database transactions.
- Expose REST/OpenAPI. Generate a TypeScript client when the API grows; do not hand-maintain duplicate contracts.
- Do not introduce LangChain, a vector database or Elasticsearch before a concrete requirement exists.
- Add an outbox when a database commit must reliably cause an external side effect.
- Run `pnpm check` and relevant Playwright flows before completion.
- Never commit `.env`, model keys, cookies, database dumps, uploads or generated data.
