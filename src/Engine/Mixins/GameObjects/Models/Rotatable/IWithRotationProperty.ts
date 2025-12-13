import type { IEuler } from '@/Engine/Euler';

export type IWithRotationProperty = {
  rotation: {
    set: (x: number, y: number, z: number) => IEuler;
    x: number;
    y: number;
    z: number;
  };
};
