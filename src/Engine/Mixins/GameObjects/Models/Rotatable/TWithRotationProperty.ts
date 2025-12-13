import type { Euler } from 'three';

export type TWithRotationProperty = {
  rotation: {
    set: (x: number, y: number, z: number) => Euler;
    x: number;
    y: number;
    z: number;
  };
};
