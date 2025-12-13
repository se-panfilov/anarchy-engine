// Fixing "value" between "minimum" and "maximum" boundaries (if v < min => min, if v > max => max)
export function clamp(val: number, minimum: number, maximum: number): number {
  const min: number = Math.min(minimum, maximum);
  const max: number = Math.max(minimum, maximum);
  return Math.max(min, Math.min(max, val));
}
