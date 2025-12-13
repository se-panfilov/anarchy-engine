import type { TWithRotation } from './TWithRotation';

export type TRotatableX = TWithRotation &
  Readonly<{
    setRotationX: (x: number) => void;
    getRotationX: () => number;
    adjustRotationByX: (x: number) => void;
  }>;
