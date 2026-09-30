from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import Task
from app.schemas import TaskCreate, TaskResponse
from app.worker import process_task

router = APIRouter()


@router.get("/health")
async def health(session: Annotated[AsyncSession, Depends(get_db)]) -> dict[str, str]:
    await session.execute(text("SELECT 1"))
    return {"status": "ok", "database": "ok"}


@router.get("/tasks", response_model=list[TaskResponse])
async def list_tasks(session: Annotated[AsyncSession, Depends(get_db)]) -> list[Task]:
    return list(
        (await session.scalars(select(Task).order_by(Task.created_at.desc()).limit(50))).all()
    )


@router.post("/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    payload: TaskCreate, session: Annotated[AsyncSession, Depends(get_db)]
) -> Task:
    task = Task(title=payload.title)
    session.add(task)
    await session.commit()
    await session.refresh(task)
    return task


@router.post("/tasks/{task_id}/process", status_code=status.HTTP_202_ACCEPTED)
async def queue_task(
    task_id: UUID,
    session: Annotated[AsyncSession, Depends(get_db)],
) -> dict[str, str]:
    task = await session.get(Task, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="task_not_found")
    try:
        job = process_task.delay(str(task.id))
    except OSError as error:
        raise HTTPException(status_code=503, detail="queue_unavailable") from error
    return {"task_id": str(task.id), "job_id": str(job.id)}
