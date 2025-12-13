import type { TWithRotation } from './TWithRotation';

export type TRotatableZ = TWithRotation &
  Readonly<{
    setRotationZ: (z: number) => void;
    getRotationZ: () => number;
    adjustRotationByZ: (z: number) => void;
  }>;
