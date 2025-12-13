import type { TWithCoordsXYZ } from '@/Engine/Mixins';

export function getRotationBySin(coord: number, fullRotation: number = 1, distance: number = 2): number {
  const rotateTimes: number = 2 * Math.PI * fullRotation;
  return Math.sin(coord * rotateTimes) * distance;
}

export function getRotationByCos(coord: number, fullRotation: number = 1, distance: number = 2): number {
  const rotateTimes: number = 2 * Math.PI * fullRotation;
  return Math.cos(coord * rotateTimes) * distance;
}

export enum RotationDirections {
  XY = 'XY',
  YZ = 'YZ',
  XZ = 'XZ'
}

export function getCircleRotation(rotateBy: RotationDirections, x: number, y: number, z: number, fullRotation: number = 1, distance: number): TWithCoordsXYZ | never {
  const rotateTimes: number = 2 * Math.PI * fullRotation;
  switch (rotateBy) {
    case RotationDirections.XY:
      return {
        x: Math.sin(x * rotateTimes) * distance,
        y: Math.cos(y * rotateTimes) * distance,
        z: z
      };
    case RotationDirections.YZ:
      return {
        x: x,
        y: Math.sin(y * rotateTimes) * distance,
        z: Math.cos(z * rotateTimes) * distance
      };
    case RotationDirections.XZ:
      return {
        x: Math.sin(x * rotateTimes) * distance,
        y: y,
        z: Math.cos(z * rotateTimes) * distance
      };
  }
  throw new Error(`Unknown rotation direction "${rotateBy}"`);
}
