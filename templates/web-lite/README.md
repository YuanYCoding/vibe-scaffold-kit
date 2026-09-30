# __PROJECT_TITLE__

Next.js full-stack starter for an MVP, content product or straightforward SaaS.

UI 使用 Tailwind CSS 4 + shadcn/ui Radix Nova；业务数据统一存入 PostgreSQL。

```bash
docker compose up -d postgres
pnpm db:generate
pnpm db:deploy
pnpm dev
```

Open <http://localhost:3000> and <http://localhost:3000/api/health>.

Before a pull request:

```bash
pnpm check
pnpm test:e2e
pnpm build
```

Production uses `pnpm db:deploy`; never use `prisma db push` against production.

After changing `prisma/schema.prisma`, create and review a new migration with
`pnpm db:migrate --name describe_your_change`, then commit the migration.

新增 UI 组件：

```bash
pnpm dlx shadcn@latest add dialog
```
