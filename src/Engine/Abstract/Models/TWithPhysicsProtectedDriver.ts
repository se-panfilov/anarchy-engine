import type { TProtectedDriverFacade } from '@/Engine/Abstract';
import type { ActorDriver } from '@/Engine/Actor/Constants';
import type { TPhysicsActorDriver } from '@/Engine/Physics';

export type TWithPhysicsProtectedDriver = Readonly<{ [ActorDriver.Physical]: TProtectedDriverFacade<TPhysicsActorDriver> }>;
