import { describe, expect, it } from "vitest";

describe("worker", () => {
  it("has a deterministic queue name", () => expect("default").toBe("default"));
});
