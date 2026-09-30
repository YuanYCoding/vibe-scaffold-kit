import { type CreateTaskInput, createTaskSchema } from "@__PROJECT_SLUG__/contracts";
import { db } from "@__PROJECT_SLUG__/db";
import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller("tasks")
export class TasksController {
  @Get()
  list() {
    return db.task.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  }

  @Post()
  create(@Body() body: CreateTaskInput) {
    const input = createTaskSchema.parse(body);
    return db.task.create({ data: input });
  }
}
