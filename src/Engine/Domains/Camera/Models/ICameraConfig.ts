import type { ICameraParams } from '@Engine/Domains/Camera';
import type { IVector3dConfig } from '@Engine/Models/IVector3dConfig';

export type ICameraConfig = Omit<ICameraParams, 'lookAt' | 'position'> &
  Readonly<{
    lookAt: IVector3dConfig;
    position: IVector3dConfig;
  }>;
