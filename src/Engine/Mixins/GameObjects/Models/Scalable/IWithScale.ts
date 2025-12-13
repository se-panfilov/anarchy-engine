import type { IVector3 } from '@/Engine/Vector';

export type IWithScale = {
  scale: {
    x: number;
    y: number;
    z: number;
    set: (x: number, y: number, z: number) => IVector3;
  };
};
