# 技术选型说明

## 共同底座

三套模板都使用 PostgreSQL、Migration、Docker Compose、GitHub Actions、结构化环境变量和自动测试。原因是这些能力从原型到生产都不会浪费，且能阻止 AI Coding 最常见的架构漂移。

## 从加密蜂保留下来的已验证做法

`ai-platform` 不是凭空拼装：它保留了加密蜂已经跑通的 Next.js 前端、FastAPI、Pydantic、SQLAlchemy/Alembic、PostgreSQL、Redis、独立 Worker、健康检查和本地 Compose 开发链路。数据库 schema 与 migration 进入 Git，业务数据不进入 Git；Worker 只接收任务标识，再回 PostgreSQL 读取事实状态。

没有把加密蜂现有的多个专用抓取/指标/LLM Worker、后台领域模型和生产部署细节硬编码进通用模板，因为它们是业务资产，不是所有新项目都需要的基础设施。通用模板继承的是边界、迁移、测试和部署纪律。

## web-lite

使用 Next.js App Router、React、TypeScript、Tailwind、shadcn 兼容组件、Zod、React Hook Form、TanStack Query、Prisma、PostgreSQL 和 Better Auth。

它把页面、Server Components、Route Handlers 和认证留在一个应用中，修改一个功能时上下文最集中。没有默认加入 Redis、Worker 或独立 API，因为小项目过早拆层会降低开发速度。

## ts-platform

使用 pnpm + Turborepo Monorepo、Next.js、NestJS + Fastify、REST + OpenAPI、共享 Zod Contract、Prisma、PostgreSQL、Redis 和 BullMQ。

它适合需要独立扩容后端、多个客户端、定时任务、支付或复杂权限的项目。模块化单体保留清晰边界，但避免一开始拆成微服务。

## ai-platform

使用 Next.js 前端、FastAPI、Pydantic、SQLAlchemy 2、psycopg 3、Alembic、Celery、Redis 和 PostgreSQL。

这套保留 Python 的 AI、数据和爬虫生态，同时沿用加密蜂验证过的 API、Migration、Worker、数据事实边界和容器化经验。前后端契约通过 OpenAPI，而不是手工复制不受约束的 JSON。

## 刻意没有默认加入

- Kubernetes、Kafka、微服务、CQRS、Event Sourcing：绝大多数新项目不需要。
- Elasticsearch：先使用 PostgreSQL 全文搜索。
- Zustand：只有出现真正的跨页面客户端状态时再添加。
- OpenTelemetry/Sentry：目录和环境变量可后加；原型阶段不强制连接外部 SaaS。
- 对象存储：需要上传业务时再启用 S3/R2/MinIO，避免空项目背负无用服务。

## 升级路径

`web-lite` 出现大量 Worker、公开 API或多客户端后，迁移到 `ts-platform`。业务天然依赖 Python 数据生态时直接使用 `ai-platform`，不要先用 Node 重写一遍再迁移。
