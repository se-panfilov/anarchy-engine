import type { Quaternion, Vector3 } from 'three';

import type { TWithReadonlyTags } from '@/Engine/Mixins';

import type { TPhysicsBodyProps } from './TPhysicsBodyProps';

export type TPhysicsBodyParams = TPhysicsBodyProps &
  Readonly<{
    position?: Vector3;
    rotation?: Quaternion;
    isSleep?: boolean;
  }> &
  TWithReadonlyTags;
