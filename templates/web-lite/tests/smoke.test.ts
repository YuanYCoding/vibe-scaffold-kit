import { describe, expect, it } from "vitest";
import { z } from "zod";

describe("starter contract", () => {
  it("rejects an invalid project item", () => {
    const schema = z.object({ title: z.string().min(1) });
    expect(schema.safeParse({ title: "" }).success).toBe(false);
  });
});
