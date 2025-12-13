import { CameraTag } from '@Engine/Constants';
import type { IWrapper } from '@Engine/Models';
import { IPerspectiveCamera } from '@Engine/Models';
import type { ICameraAccessors } from '@Engine/Wrappers';

export type ICameraWrapper = IWrapper<IPerspectiveCamera> &
  ICameraAccessors &
  Readonly<{
    tags: ReadonlyArray<CameraTag>;
  }>;
