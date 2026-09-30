# Architecture

The browser reaches a Next.js application. Next.js talks to a versioned FastAPI REST API. FastAPI persists business truth in PostgreSQL and sends long-running work to Celery through Redis. Workers receive IDs, load authoritative state from PostgreSQL, perform an idempotent operation and persist the result.

Use one modular API and one database until independent scaling or ownership is proven. For LLM features, validate structured output with Pydantic, store prompt/model/token/cost metadata, and keep provider responses behind an adapter.

Redis is not a business database. If losing a queued message would lose user data, add a PostgreSQL outbox and a dispatcher instead of relying on a dual write.
