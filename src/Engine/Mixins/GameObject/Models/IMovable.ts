import type { IVector3Wrapper } from '@/Engine/Wrappers';

export type IMovable = Readonly<{
  setPosition: (x: number, y: number, z: number) => IVector3Wrapper;
  getPosition: () => IVector3Wrapper;
  addX: (x: number) => number;
  addY: (y: number) => number;
  addZ: (z: number) => number;
  setX: (x: number) => number;
  getX: () => number;
  setY: (y: number) => number;
  getY: () => number;
  setZ: (z: number) => number;
  getZ: () => number;
}>;
