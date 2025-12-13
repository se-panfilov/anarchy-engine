import type { IEulerWrapper } from '@/Engine/Wrappers';

export type IWithRotation = Readonly<{
  setRotation: (x: number, y: number, z: number) => IEulerWrapper;
  getRotation: () => IEulerWrapper;
}>;
