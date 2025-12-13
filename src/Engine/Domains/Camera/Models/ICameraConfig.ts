import type { IVector3dConfig } from '@Engine/Domains/ThreeLib';

import type { ICameraParams } from './ICameraParams';

export type ICameraConfig = Omit<ICameraParams, 'rotation' | 'position'> &
  Readonly<{
    rotation: IVector3dConfig;
    position: IVector3dConfig;
  }>;
