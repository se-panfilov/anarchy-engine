import type { IWrapper } from '@Engine/Models';
import type { ICameraAccessors, IPerspectiveCamera } from '@Engine/Domains/Camera/Models';
import type { CameraTag } from '@Engine/Domains/Camera/Constants';

export type ICameraWrapper = IWrapper<IPerspectiveCamera> &
  ICameraAccessors &
  Readonly<{
    tags: ReadonlyArray<CameraTag>;
  }>;
