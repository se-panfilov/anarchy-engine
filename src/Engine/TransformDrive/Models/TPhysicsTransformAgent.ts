import type { BehaviorSubject } from 'rxjs';

import type { TPhysicsBody } from '@/Engine/Physics';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TPhysicsTransformAgent = TAbstractTransformAgent &
  Readonly<{
    physicsBody$: BehaviorSubject<TPhysicsBody | undefined>;
  }>;
