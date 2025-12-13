import type { IEulerWrapper, IVector3Wrapper } from '@Engine/Wrappers';

import type { CommonTag } from '@/Engine/Domains/Abstract';
import type { CameraTag } from '@/Engine/Domains/Camera/Constants';

export type ICameraParams = Readonly<{
  fov?: number;
  near?: number;
  far?: number;
  position: IVector3Wrapper;
  rotation: IEulerWrapper;
  tags: ReadonlyArray<CameraTag | CommonTag | string>;
}>;
