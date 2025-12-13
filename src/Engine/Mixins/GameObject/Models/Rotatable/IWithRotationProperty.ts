import type { IEuler } from '@/Engine/Domains/Euler';

export type IWithRotationProperty = {
  rotation: {
    set: (x: number, y: number, z: number) => IEuler;
    x: number;
    y: number;
    z: number;
  };
};
