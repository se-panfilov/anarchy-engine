import type { Euler } from 'three';

export type TWithRotation = Readonly<{
  setRotation: (x: number, y: number, z: number) => Euler;
  getRotation: () => Euler;
}>;
