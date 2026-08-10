import { describe, expect, it } from "vitest";
import { easeOutCubic, lerp } from "@/lib/easing";

describe("easeOutCubic", () => {
  it("clamps to [0,1]", () => {
    expect(easeOutCubic(-1)).toBe(0);
    expect(easeOutCubic(2)).toBe(1);
  });
  it("is identity at bounds", () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
  });
  it("starts fast, eases out", () => {
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
    expect(easeOutCubic(0.25)).toBeGreaterThan(0.25);
  });
});

describe("lerp", () => {
  it("interpolates", () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 1)).toBe(20);
  });
});
