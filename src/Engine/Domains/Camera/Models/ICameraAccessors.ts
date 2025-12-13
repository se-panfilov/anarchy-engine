import type { IEuler, IVector3 } from '@/Engine/Wrappers';

export type ICameraAccessors = Readonly<{
  setPosition: (x: number, y: number, z: number) => IVector3;
  setRotation: (x: number, y: number, z: number) => IEuler;
  setCastShadow: (value: boolean) => boolean;
  setControls: (x: number, y: number, z: number) => IVector3;
}>;
