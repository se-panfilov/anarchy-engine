import type { TPhysicsBodyFacade, TWithOptionalPhysicsBody } from '@/Engine/Physics';

import type { TActor } from './TActor';

export type TActorWithPhysicsWrapper = TActor &
  Omit<TWithOptionalPhysicsBody, 'physicsBody'> &
  Readonly<{
    physicsBody: TPhysicsBodyFacade;
  }>;
