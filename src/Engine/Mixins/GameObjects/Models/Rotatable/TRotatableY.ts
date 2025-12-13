import type { IWithRotation } from './IWithRotation';

export type TRotatableY = IWithRotation &
  Readonly<{
    setRotationY: (y: number) => void;
    getRotationY: () => number;
    adjustRotationByY: (y: number) => void;
  }>;
