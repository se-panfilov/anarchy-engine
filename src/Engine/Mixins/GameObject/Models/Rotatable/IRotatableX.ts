import type { IWithRotation } from './IWithRotation';

export type IRotatableX = IWithRotation &
  Readonly<{
    setRotationX: (x: number) => void;
    getRotationX: () => number;
    adjustRotationByX: (x: number) => void;
  }>;
