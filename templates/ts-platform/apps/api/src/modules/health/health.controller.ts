import type { HealthResponse } from "@__PROJECT_SLUG__/contracts";
import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  health(): HealthResponse {
    return { status: "ok", service: "api" };
  }
}
