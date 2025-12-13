import type { TWithMandatoryPhysicsBody } from '@/Engine/Physics';

import type { TActor } from './TActor';

// TODO 8.0.0. MODELS: remove (use PhysicsActorDriver instead)
export type TActorWithPhysics = TWithMandatoryPhysicsBody<TActor>;
