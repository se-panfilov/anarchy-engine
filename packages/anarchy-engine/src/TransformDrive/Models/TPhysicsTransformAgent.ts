import type { TSerializable } from '@Anarchy/Engine/Mixins';
import type { TPhysicsBody, TPhysicsBodyConfig } from '@Anarchy/Engine/Physics';
import type { BehaviorSubject } from 'rxjs';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TPhysicsTransformAgent = TAbstractTransformAgent &
  Readonly<{
    physicsBody$: BehaviorSubject<TPhysicsBody | undefined>;
  }> &
  TSerializable<TPhysicsBodyConfig>;
