import type { TPhysicsActorDriver } from '@/Engine/Physics';
import type { TProtectedDriverFacade } from '@/Engine/TransformDrive';
import type { ActorDriver } from '@/Engine/TransformDrive/Constants';

export type TWithPhysicsProtectedDriver = Readonly<{ [ActorDriver.Physical]: TProtectedDriverFacade<TPhysicsActorDriver> }>;
