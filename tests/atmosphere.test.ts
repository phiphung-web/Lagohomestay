import { describe, expect, it } from "vitest";
import {
  DEFAULT_APPEARANCE,
  normalizeAppearance,
  toggleAppearance
} from "@/features/showcase/lib/atmosphere";

describe("LAKA manual appearance", () => {
  it("defaults to the light appearance", () => {
    expect(DEFAULT_APPEARANCE).toBe("day");
    expect(normalizeAppearance(null)).toBe("day");
    expect(normalizeAppearance("auto")).toBe("day");
  });

  it("restores the visitor's explicit dark choice", () => {
    expect(normalizeAppearance("night")).toBe("night");
  });

  it("toggles directly between light and dark", () => {
    expect(toggleAppearance("day")).toBe("night");
    expect(toggleAppearance("night")).toBe("day");
  });
});
