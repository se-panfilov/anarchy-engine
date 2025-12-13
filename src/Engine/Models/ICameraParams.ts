import type { CameraTag } from '@Engine/Constants';
import type { IVector3 } from '@Engine/Models/IVector3';

export type ICameraParams = Readonly<{
  fov?: number;
  near?: number;
  far?: number;
  lookAt: IVector3;
  position: IVector3;
  tag: CameraTag;
}>;
