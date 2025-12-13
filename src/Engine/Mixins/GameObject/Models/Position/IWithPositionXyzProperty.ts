import type { IVector3 } from '@/Engine/Wrappers';

export type IWithPositionXyzProperty = Readonly<{
  position: {
    x: number;
    y: number;
    z: number;
    set: (x: number, y: number, z: number) => IVector3;
  };
}>;
