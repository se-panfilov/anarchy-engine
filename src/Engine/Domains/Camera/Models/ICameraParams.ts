import type { IEuler, IVector3 } from '@Engine/Wrappers';

import type { CommonTag } from '@/Engine/Domains/Abstract';
import type { CameraTag } from '@/Engine/Domains/Camera/Constants';

export type ICameraParams = Readonly<{
  fov?: number;
  near?: number;
  far?: number;
  position: IVector3;
  rotation: IEuler;
  tags: ReadonlyArray<CameraTag | CommonTag | string>;
}>;
