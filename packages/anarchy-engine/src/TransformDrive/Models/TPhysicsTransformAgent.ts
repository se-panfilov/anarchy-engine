import type { TSerializable } from '@hellpig/anarchy-engine/Mixins';
import type { TPhysicsBody, TPhysicsBodyConfig } from '@hellpig/anarchy-engine/Physics';
import type { BehaviorSubject } from 'rxjs';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TPhysicsTransformAgent = TAbstractTransformAgent &
  Readonly<{
    physicsBody$: BehaviorSubject<TPhysicsBody | undefined>;
  }> &
  TSerializable<TPhysicsBodyConfig>;
