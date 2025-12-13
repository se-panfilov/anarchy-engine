import type { IVector3 } from '@Engine/Wrappers';

import type { CommonTags } from '@/Engine/Domains/Abstract';
import type { CameraTag } from '@/Engine/Domains/Camera/Constants';

export type ICameraParams = Readonly<{
  fov?: number;
  near?: number;
  far?: number;
  lookAt: IVector3;
  position: IVector3;
  tags: ReadonlyArray<CameraTag | CommonTags | string>;
}>;
