import type { IWithPosition } from './IWithPosition';

export type IMovableZ = IWithPosition &
  Readonly<{
    addZ: (z: number) => number;
    setZ: (z: number) => number;
    getZ: () => number;
  }>;
