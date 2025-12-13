import type { IWithCoords2 } from './IWithCoords2';

export type IWithCoords3 = IWithCoords2 &
  Readonly<{
    z: number;
  }>;
