import type { IWithRotation } from './IWithRotation';

export type IRotatableY = IWithRotation &
  Readonly<{
    setRotationY: (y: number) => void;
    getRotationY: () => number;
    adjustRotationByY: (y: number) => void;
  }>;
