import { describe, expect, it } from "vitest";

describe("web", () => {
  it("keeps the API versioned", () => expect("/api/v1/health").toMatch(/^\/api\/v1/));
});
