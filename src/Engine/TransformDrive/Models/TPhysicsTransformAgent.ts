import type { BehaviorSubject, Observable } from 'rxjs';

import type { TPhysicsBody } from '@/Engine/Physics';
import type { TReadonlyQuaternion } from '@/Engine/ThreeLib';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TPhysicsTransformAgent = TAbstractTransformAgent &
  Readonly<{
    rotationQuaternion$: Observable<TReadonlyQuaternion>;
    physicsBody$: BehaviorSubject<TPhysicsBody | undefined>;
  }>;
