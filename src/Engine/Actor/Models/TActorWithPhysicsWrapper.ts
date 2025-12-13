import type { TPhysicsBodyFacade, TWithOptionalPhysicsBody } from '@/Engine/Physics';

import type { TActorWrapper } from './TActorWrapper';

export type TActorWithPhysicsWrapper = TActorWrapper &
  Omit<TWithOptionalPhysicsBody, 'physicsBody'> &
  Readonly<{
    physicsBody: TPhysicsBodyFacade;
  }>;
