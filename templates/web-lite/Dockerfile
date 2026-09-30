FROM node:24-alpine AS dependencies
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

FROM dependencies AS builder
COPY . .
RUN export DATABASE_URL=postgresql://postgres:build-only@127.0.0.1:5432/build \
    APP_NAME=build \
    BETTER_AUTH_SECRET=build-only-secret-with-at-least-thirty-two-characters \
    BETTER_AUTH_URL=http://127.0.0.1:3000 && \
    pnpm db:generate && pnpm build

FROM node:24-alpine AS runtime
ENV NODE_ENV=production HOSTNAME=0.0.0.0 PORT=3000
WORKDIR /app
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
CMD ["node", "server.js"]
