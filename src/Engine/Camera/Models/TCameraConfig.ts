import type { Vector3 } from 'three';

import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TCameraProps } from './TCameraProps';

export type TCameraConfig = Omit<TCameraProps, 'lookAt'> &
  Readonly<{
    lookAt?: Vector3;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;
