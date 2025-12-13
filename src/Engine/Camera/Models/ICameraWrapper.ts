import type { IWrapper } from '@/Engine/Abstract';
import type { CameraTag } from '@/Engine/Camera/Constants';
import type { IMovable3dXYZ, IRotatable, IWithObject3d, IWithTags } from '@/Engine/Mixins';

import type { ICameraAccessors } from './ICameraAccessors';
import type { IPerspectiveCamera } from './IPerspectiveCamera';

export type ICameraWrapper = IWrapper<IPerspectiveCamera> &
  IWithObject3d &
  Readonly<{
    setActive: (value: boolean) => void;
    isActive: () => boolean;
  }> &
  ICameraAccessors &
  IMovable3dXYZ &
  IRotatable &
  IWithTags<CameraTag>;
