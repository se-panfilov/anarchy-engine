import type { Vector3Like } from 'three/src/math/Vector3';

import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TCameraProps } from './TCameraProps';

export type TCameraConfig = Omit<TCameraProps, 'lookAt'> &
  Readonly<{
    lookAt?: Vector3Like;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;
