import type { TWithMandatoryPhysicsBody } from '@/Engine/Physics';

import type { TActorWrapper } from './TActorWrapper';

export type TActorWrapperWithPhysics = TWithMandatoryPhysicsBody<TActorWrapper>;
