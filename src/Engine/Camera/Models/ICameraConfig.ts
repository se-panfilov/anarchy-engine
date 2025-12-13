import type { CameraTag } from '@/Engine/Camera/Constants';
import type { IWithCoordsXYZ, IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DPropConfig } from '@/Engine/ThreeLib';

import type { ICameraProps } from './ICameraProps';

export type ICameraConfig = Omit<ICameraProps, 'lookAt'> &
  Readonly<{
    lookAt?: IWithCoordsXYZ;
  }> &
  IObject3DPropConfig &
  IWithReadonlyTags<CameraTag>;
