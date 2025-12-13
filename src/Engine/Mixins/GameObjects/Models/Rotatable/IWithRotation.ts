import type { TEulerWrapper } from '@/Engine/Euler';

export type IWithRotation = Readonly<{
  setRotation: (x: number, y: number, z: number) => TEulerWrapper;
  getRotation: () => TEulerWrapper;
}>;
