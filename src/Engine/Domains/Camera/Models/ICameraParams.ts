import type { IVector3 } from '@Engine/Wrappers';

import type { CameraTag } from '../Constants';

export type ICameraParams = Readonly<{
  fov?: number;
  near?: number;
  far?: number;
  lookAt: IVector3;
  position: IVector3;
  tags: ReadonlyArray<CameraTag>;
}>;
