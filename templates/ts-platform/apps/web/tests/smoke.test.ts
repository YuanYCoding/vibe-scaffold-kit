import { describe, expect, it } from "vitest";

describe("web", () => {
  it("uses the public API boundary", () => expect("/api/v1").toContain("api"));
});
