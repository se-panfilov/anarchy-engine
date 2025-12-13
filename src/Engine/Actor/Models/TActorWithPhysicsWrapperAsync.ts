import type { TPhysicsBodyFacade, TWithOptionalPhysicsBody } from '@/Engine/Physics';

import type { TActorWrapperAsync } from './TActorWrapperAsync';

export type TActorWithPhysicsWrapperAsync = TActorWrapperAsync &
  Omit<TWithOptionalPhysicsBody, 'physicsBody'> &
  Readonly<{
    physicsBody: TPhysicsBodyFacade;
  }>;
