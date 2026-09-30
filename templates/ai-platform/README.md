# __PROJECT_TITLE__

Next.js + FastAPI starter for AI, crawlers and data pipelines.

Web UI 使用 Tailwind CSS 4 + shadcn/ui Radix Nova；业务数据统一存入 PostgreSQL。

```bash
docker compose up -d postgres redis
pnpm db:migrate
pnpm dev
```

- Web: <http://localhost:3000>
- API: <http://localhost:8000/api/v1/health>
- OpenAPI: <http://localhost:8000/docs>

Before a pull request:

```bash
pnpm check
pnpm build
pnpm test:e2e
```

Generate a migration after changing SQLAlchemy models:

```bash
pnpm db:generate add_user_profile
```

Review both `upgrade()` and `downgrade()` before committing it.

新增 UI 组件：

```bash
cd apps/web
pnpm dlx shadcn@latest add dialog
```
