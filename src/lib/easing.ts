/** Shared easing + animation math (pure, testable). */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function easeOutCubic(p: number): number {
  return 1 - Math.pow(1 - Math.min(1, Math.max(0, p)), 3);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
