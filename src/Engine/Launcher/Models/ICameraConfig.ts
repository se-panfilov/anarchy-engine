import type { IVector3dConfig } from '@Engine/Launcher/Models/IVector3dConfig';
import type { ICameraParams } from '@Engine/Models';

export type ICameraConfig = Omit<ICameraParams, 'lookAt' | 'position'> &
  Readonly<{
    lookAt: IVector3dConfig;
    position: IVector3dConfig;
  }>;
