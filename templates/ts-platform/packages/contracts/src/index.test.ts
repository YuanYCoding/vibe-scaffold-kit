import { describe, expect, it } from "vitest";
import { createTaskSchema } from "./index.js";

describe("createTaskSchema", () => {
  it("rejects blank titles", () =>
    expect(createTaskSchema.safeParse({ title: " " }).success).toBe(false));
});
