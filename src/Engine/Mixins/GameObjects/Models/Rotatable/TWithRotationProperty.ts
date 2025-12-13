import type { TEuler } from '@/Engine/Euler';

export type TWithRotationProperty = {
  rotation: {
    set: (x: number, y: number, z: number) => TEuler;
    x: number;
    y: number;
    z: number;
  };
};
