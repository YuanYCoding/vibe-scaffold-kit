from celery import Celery  # type: ignore[import-untyped]

from app.config import get_settings

settings = get_settings()
celery_app = Celery("__PROJECT_SLUG__", broker=settings.redis_url, backend=settings.redis_url)
celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    task_acks_late=True,
    worker_prefetch_multiplier=1,
)


@celery_app.task(  # type: ignore[untyped-decorator]
    autoretry_for=(OSError,), retry_backoff=True, retry_kwargs={"max_retries": 3}
)
def process_task(task_id: str) -> dict[str, str]:
    """Replace this body with an idempotent AI/data operation."""
    return {"task_id": task_id, "status": "processed"}
