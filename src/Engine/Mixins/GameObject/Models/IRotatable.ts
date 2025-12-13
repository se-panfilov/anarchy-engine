import type { IEulerWrapper } from '@/Engine/Wrappers';

export type IRotatable = Readonly<{
  setRotation: (x: number, y: number, z: number) => IEulerWrapper;
  setRotationX: (x: number) => void;
  setRotationY: (y: number) => void;
  setRotationZ: (z: number) => void;
  adjustRotationByX: (x: number) => void;
  adjustRotationByY: (y: number) => void;
  adjustRotationByZ: (z: number) => void;
}>;
