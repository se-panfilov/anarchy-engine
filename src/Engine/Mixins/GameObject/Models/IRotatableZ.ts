import type { IWithRotation } from './IWithRotation';

export type IRotatableZ = IWithRotation &
  Readonly<{
    setRotationZ: (z: number) => void;
    getRotationZ: () => number;
    adjustRotationByZ: (z: number) => void;
  }>;
