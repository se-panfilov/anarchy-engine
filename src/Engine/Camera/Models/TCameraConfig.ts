import type { TWithCoordsXYZ, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TCameraProps } from './TCameraProps';

export type TCameraConfig = Omit<TCameraProps, 'lookAt'> &
  Readonly<{
    lookAt?: TWithCoordsXYZ;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;
