import type { Vector2Like, Vector4Like } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

export function isEqualOrSimilarNumbers(prev: number, curr: number, threshold: number = 0): boolean {
  return Math.abs(curr - prev) <= threshold;
}

export function isEqualOrSimilarVector4Like(prev: Vector4Like, curr: Vector4Like, threshold: number): boolean {
  return isEqualOrSimilarVector3Like(prev, curr, threshold) && differenceSmallerThan(curr.w, prev.w, threshold);
}

export function isEqualOrSimilarVector3Like(prev: Vector3Like, curr: Vector3Like, threshold: number): boolean {
  return isEqualOrSimilarVector2Like(prev, curr, threshold) && differenceSmallerThan(curr.z, prev.z, threshold);
}

export function isEqualOrSimilarByXyzCoords(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, threshold: number): boolean {
  return isEqualOrSimilarByXyCoords(x1, y1, x2, y2, threshold) && differenceSmallerThan(z1, z2, threshold);
}

export function isEqualOrSimilarVector2Like(prev: Vector2Like, curr: Vector2Like, threshold: number): boolean {
  return differenceSmallerThan(curr.x, prev.x, threshold) && differenceSmallerThan(curr.y, prev.y, threshold);
}

export function isEqualOrSimilarByXyCoords(x1: number, y1: number, x2: number, y2: number, threshold: number): boolean {
  return differenceSmallerThan(x1, x2, threshold) && differenceSmallerThan(y1, y2, threshold);
}

function differenceSmallerThan(a: number, b: number, value: number): boolean {
  return Math.abs(a - b) <= value;
}
