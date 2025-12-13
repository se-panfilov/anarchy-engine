import type { TSerializable } from '@Engine/Mixins';
import type { TPhysicsBody, TPhysicsBodyConfig } from '@Engine/Physics';
import type { BehaviorSubject } from 'rxjs';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TPhysicsTransformAgent = TAbstractTransformAgent &
  Readonly<{
    physicsBody$: BehaviorSubject<TPhysicsBody | undefined>;
  }> &
  TSerializable<TPhysicsBodyConfig>;
