import type { IVector2dConfig } from './IVector2dConfig';

export type IVector3dConfig = IVector2dConfig &
  Readonly<{
    z: number;
  }>;
