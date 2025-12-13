import { Vector3 } from 'three';

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

export function getCircleRotation(rotateBy: RotationDirections, x: number, y: number, z: number, fullRotation: number = 1, distance: number): Vector3 | never {
  const rotateTimes: number = 2 * Math.PI * fullRotation;
  switch (rotateBy) {
    case RotationDirections.XY:
      return new Vector3(Math.sin(x * rotateTimes) * distance, Math.cos(y * rotateTimes) * distance, z);
    case RotationDirections.YZ:
      return new Vector3(x, Math.sin(y * rotateTimes) * distance, Math.cos(z * rotateTimes) * distance);
    case RotationDirections.XZ:
      return new Vector3(Math.sin(x * rotateTimes) * distance, y, Math.cos(z * rotateTimes) * distance);
  }
  throw new Error(`Unknown rotation direction "${rotateBy}"`);
}
