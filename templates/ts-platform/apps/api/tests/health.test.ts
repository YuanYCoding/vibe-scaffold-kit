import { describe, expect, it } from "vitest";
import { HealthController } from "../src/modules/health/health.controller.js";

describe("HealthController", () => {
  it("reports healthy", () =>
    expect(new HealthController().health()).toEqual({ status: "ok", service: "api" }));
});
