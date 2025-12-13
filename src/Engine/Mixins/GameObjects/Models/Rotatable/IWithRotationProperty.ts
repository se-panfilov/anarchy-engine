import type { TEuler } from '@/Engine/Euler';

export type IWithRotationProperty = {
  rotation: {
    set: (x: number, y: number, z: number) => TEuler;
    x: number;
    y: number;
    z: number;
  };
};
