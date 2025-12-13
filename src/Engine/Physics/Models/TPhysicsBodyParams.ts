import type { Vector4 } from 'three';
import type { Vector3 } from 'three/src/math/Vector3';

import type { TWithReadonlyTags } from '@/Engine/Mixins';

import type { TPhysicsBodyProps } from './TPhysicsBodyProps';

export type TPhysicsBodyParams = TPhysicsBodyProps &
  Readonly<{
    position?: Vector3;
    rotation?: Vector4;
    shouldUpdateKinematic?: boolean;
    isSleep?: boolean;
  }> &
  TWithReadonlyTags;
