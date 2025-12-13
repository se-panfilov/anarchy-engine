import type { IEuler } from '@/Engine/Wrappers';

export type IWithRotation = {
  rotation: {
    set: (x: number, y: number, z: number) => IEuler;
  };
};
