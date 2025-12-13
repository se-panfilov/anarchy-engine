import type { CameraTag } from '@/Engine/Domains/Camera/Constants';
import type { IObject3DPropConfig } from '@/Engine/Domains/ThreeLib';
import type { IWithCoordsXYZ, IWithReadonlyTags } from '@/Engine/Mixins';

import type { ICameraProps } from './ICameraProps';

export type ICameraConfig = Omit<ICameraProps, 'rotation' | 'position' | 'lookAt'> &
  Readonly<{
    rotation: IWithCoordsXYZ;
    position: IWithCoordsXYZ;
    lookAt?: IWithCoordsXYZ;
  }> & IObject3DPropConfig & IWithReadonlyTags<CameraTag>;
