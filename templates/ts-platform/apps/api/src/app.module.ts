import { Module } from "@nestjs/common";
import { HealthController } from "./modules/health/health.controller.js";
import { TasksController } from "./modules/tasks/tasks.controller.js";

@Module({ controllers: [HealthController, TasksController] })
export class AppModule {}
