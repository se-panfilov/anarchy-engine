import type { IWithConfigId, IWithCoordsXYZ, IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DPropConfig } from '@/Engine/ThreeLib';

import type { ICameraProps } from './ICameraProps';

export type ICameraConfig = Omit<ICameraProps, 'lookAt'> &
  Readonly<{
    lookAt?: IWithCoordsXYZ;
    configId: string;
  }> &
  IWithConfigId &
  IObject3DPropConfig &
  IWithReadonlyTags<string>;
