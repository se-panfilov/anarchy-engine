import type { IVector3Wrapper } from '@/Engine/Wrappers';

export type IMovable = Readonly<{
  setPosition: (x: number, y: number, z: number) => IVector3Wrapper;
  addX: (x: number) => number;
  addY: (y: number) => number;
  addZ: (z: number) => number;
  setX: (x: number) => number;
  setY: (y: number) => number;
  setZ: (z: number) => number;
}>;
