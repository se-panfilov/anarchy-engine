import type { IWithRotation } from './IWithRotation';

export type TRotatableZ = IWithRotation &
  Readonly<{
    setRotationZ: (z: number) => void;
    getRotationZ: () => number;
    adjustRotationByZ: (z: number) => void;
  }>;
