import type { IEuler } from '@/Engine/Wrappers';

export type IWithRotationProperty = {
  rotation: {
    set: (x: number, y: number, z: number) => IEuler;
    x: number;
    y: number;
    z: number;
  };
};
