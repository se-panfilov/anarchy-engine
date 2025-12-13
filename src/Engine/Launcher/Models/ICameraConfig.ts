import type { ICameraParams } from '@Engine/Models';
import type { IVector3dConfig } from '@Engine/Launcher/Models/IVector3dConfig';

export interface ICameraConfig extends Omit<ICameraParams, 'lookAt' | 'position'> {
  readonly lookAt: IVector3dConfig;
  readonly position: IVector3dConfig;
}
