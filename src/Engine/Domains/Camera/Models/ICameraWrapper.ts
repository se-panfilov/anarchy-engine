import type { CameraTag, ICameraAccessors, IPerspectiveCamera } from '@Engine/Domains/Camera';
import type { IWrapper } from '@Engine/Models';

export type ICameraWrapper = IWrapper<IPerspectiveCamera> &
  ICameraAccessors &
  Readonly<{
    tags: ReadonlyArray<CameraTag>;
  }>;
