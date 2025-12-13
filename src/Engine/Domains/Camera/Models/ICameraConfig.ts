import type { IVector3dConfig } from '@Engine/Domains/ThreeLib';

import type { ICameraParams } from './ICameraParams';

export type ICameraConfig = Omit<ICameraParams, 'lookAt' | 'position'> &
  Readonly<{
    lookAt: IVector3dConfig;
    position: IVector3dConfig;
  }>;
