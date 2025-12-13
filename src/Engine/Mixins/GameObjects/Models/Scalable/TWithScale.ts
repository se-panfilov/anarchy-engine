import type { TVector3 } from '@/Engine/Vector';

export type TWithScale = {
  scale: {
    x: number;
    y: number;
    z: number;
    set: (x: number, y: number, z: number) => TVector3;
  };
};
