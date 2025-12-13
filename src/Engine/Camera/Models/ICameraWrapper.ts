import type { IWrapper } from '@/Engine/Abstract';
import type { CameraTag } from '@/Engine/Camera/Constants';
import type { IMovable3dXYZ, IRotatable, IWithActive, IWithObject3d, IWithTags } from '@/Engine/Mixins';

import type { ICamera } from './ICamera';
import type { ICameraAccessors } from './ICameraAccessors';

export type ICameraWrapper = IWrapper<ICamera> &
  IWithObject3d &
  Readonly<{
    setActive: (value: boolean) => void;
    isActive: () => boolean;
  }> &
  IWithActive<ICamera> &
  ICameraAccessors &
  IMovable3dXYZ &
  IRotatable &
  IWithTags<CameraTag>;
