import type { Vector3 } from 'three';

export type ICameraAccessors = Readonly<{
  setPosition: (x: number, y: number, z: number) => Vector3;
  setCastShadow: (value: boolean) => boolean;
  setControls: (x: number, y: number, z: number) => Vector3;
}>;
