import type { TPhysicsActorDriver } from '@/Engine/Physics';
import type { TProtectedDriverFacade } from '@/Engine/TransformDrive';
import type { TransformDriver } from '@/Engine/TransformDrive/Constants';

export type TWithPhysicsProtectedDriver = Readonly<{ [TransformDriver.Physical]: TProtectedDriverFacade<TPhysicsActorDriver> }>;
