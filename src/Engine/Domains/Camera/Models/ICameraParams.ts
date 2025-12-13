import type { CameraTag } from '@Engine/Domains/Camera';
import type { IVector3 } from '@Engine/Wrappers';

export type ICameraParams = Readonly<{
  fov?: number;
  near?: number;
  far?: number;
  lookAt: IVector3;
  position: IVector3;
  tags: ReadonlyArray<CameraTag>;
}>;
