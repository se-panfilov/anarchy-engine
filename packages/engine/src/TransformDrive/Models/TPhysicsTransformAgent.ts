import type { BehaviorSubject } from 'rxjs';

import type { TSerializable } from '@/Mixins';
import type { TPhysicsBody, TPhysicsBodyConfig } from '@/Physics';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TPhysicsTransformAgent = TAbstractTransformAgent &
  Readonly<{
    physicsBody$: BehaviorSubject<TPhysicsBody | undefined>;
  }> &
  TSerializable<TPhysicsBodyConfig>;
