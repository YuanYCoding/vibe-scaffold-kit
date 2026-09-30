# __PROJECT_TITLE__

Production-oriented TypeScript modular monolith.

Web UI 使用 Tailwind CSS 4 + shadcn/ui Radix Nova；业务数据统一存入 PostgreSQL。

```bash
docker compose up -d postgres redis
pnpm db:generate
pnpm db:deploy
pnpm dev
```

- Web: <http://localhost:3000>
- API: <http://localhost:3001/api/v1/health>
- OpenAPI: <http://localhost:3001/docs>

Before a pull request:

```bash
pnpm check
pnpm build
pnpm test:e2e
```

Add Better Auth when identity is required; keep authentication in one authoritative module rather than adding parallel cookie and JWT systems.

After changing the Prisma schema, create and review a migration with
`pnpm db:migrate --name describe_your_change`, then commit the migration.

新增 UI 组件：

```bash
cd apps/web
pnpm dlx shadcn@latest add dialog
```
