import type { IEulerWrapper } from '@/Engine/Wrappers';

export type IRotatable = Readonly<{
  setRotation: (x: number, y: number, z: number) => IEulerWrapper;
}>;
