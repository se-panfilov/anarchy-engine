import type { TEulerWrapper } from '@/Engine/Euler';

export type IScalable = Readonly<{
  setScale: (x: number, y: number, z: number) => TEulerWrapper;
  getScale: () => TEulerWrapper;
  setScaleX: (x: number) => void;
  getScaleX: () => number;
  setScaleY: (y: number) => void;
  getScaleY: () => number;
  setScaleZ: (z: number) => void;
  getScaleZ: () => number;
  adjustScaleByX: (x: number) => void;
  adjustScaleByY: (y: number) => void;
  adjustScaleByZ: (z: number) => void;
}>;
