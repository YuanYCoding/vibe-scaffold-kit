FROM python:3.11-slim AS runtime
COPY --from=ghcr.io/astral-sh/uv:0.12.1 /uv /uvx /bin/
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PATH=/app/.venv/bin:$PATH
WORKDIR /app
COPY pyproject.toml uv.lock ./
COPY app ./app
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev --no-editable --link-mode=copy
COPY alembic.ini ./
COPY migrations ./migrations
RUN groupadd --gid 10001 app && useradd --uid 10001 --gid 10001 --no-create-home app && chown -R app:app /app
USER app
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
