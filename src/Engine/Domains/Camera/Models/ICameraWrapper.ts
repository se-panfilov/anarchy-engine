import type { CameraTag } from '@Engine/Domains/Camera/Constants';
import type { ICameraAccessors, IPerspectiveCamera } from '@Engine/Domains/Camera/Models';
import type { IWrapper } from '@Engine/Models';

export type ICameraWrapper = IWrapper<IPerspectiveCamera> &
  ICameraAccessors &
  Readonly<{
    tags: ReadonlyArray<CameraTag>;
  }>;
