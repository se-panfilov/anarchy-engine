import type { IEulerWrapper } from '@/Engine/Wrappers';

export type IRotatable = Readonly<{
  setRotation: (x: number, y: number, z: number) => IEulerWrapper;
  getRotation: () => IEulerWrapper;
  setRotationX: (x: number) => void;
  getRotationX: () => number;
  setRotationY: (y: number) => void;
  getRotationY: () => number;
  setRotationZ: (z: number) => void;
  getRotationZ: () => number;
  adjustRotationByX: (x: number) => void;
  adjustRotationByY: (y: number) => void;
  adjustRotationByZ: (z: number) => void;
}>;
