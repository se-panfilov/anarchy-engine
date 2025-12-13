import type { IWrapper } from '@Engine/Domains/Abstract';
import type { CameraTag, ICameraAccessors, IPerspectiveCamera } from '@Engine/Domains/Camera';

export type ICameraWrapper = IWrapper<IPerspectiveCamera> &
  ICameraAccessors &
  Readonly<{
    tags: ReadonlyArray<CameraTag>;
  }>;
