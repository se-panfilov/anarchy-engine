import type { TWithRotation } from './TWithRotation';

export type TRotatableY = TWithRotation &
  Readonly<{
    setRotationY: (y: number) => void;
    getRotationY: () => number;
    adjustRotationByY: (y: number) => void;
  }>;
