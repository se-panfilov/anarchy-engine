import type { TPhysicsBodyFacade, TWithMaybePhysicsBody } from '@/Engine/Physics';

import type { TActorWrapperAsync } from './TActorWrapperAsync';

export type TActorWithPhysicsWrapperAsync = TActorWrapperAsync &
  Omit<TWithMaybePhysicsBody, 'physicsBody'> &
  Readonly<{
    physicsBody: TPhysicsBodyFacade;
  }>;
