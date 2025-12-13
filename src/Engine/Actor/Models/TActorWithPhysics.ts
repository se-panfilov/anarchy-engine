import type { TWithMandatoryPhysicsBody } from '@/Engine/Physics';

import type { TActor } from './TActor';

export type TActorWithPhysics = TWithMandatoryPhysicsBody<TActor>;
