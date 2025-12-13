import type { TEulerWrapper } from '@/Engine/Euler';

export type TWithRotation = Readonly<{
  setRotation: (x: number, y: number, z: number) => TEulerWrapper;
  getRotation: () => TEulerWrapper;
}>;
