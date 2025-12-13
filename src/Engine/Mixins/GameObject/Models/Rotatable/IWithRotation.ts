import type { IEulerWrapper } from '@/Engine/Domains/Euler';

export type IWithRotation = Readonly<{
  setRotation: (x: number, y: number, z: number) => IEulerWrapper;
  getRotation: () => IEulerWrapper;
}>;
