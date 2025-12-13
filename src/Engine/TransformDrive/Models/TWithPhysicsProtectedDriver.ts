import type { TPhysicsActorDriver } from '@/Engine/Physics';
import type { TProtectedTransformDriverFacade } from '@/Engine/TransformDrive';
import type { TransformDriver } from '@/Engine/TransformDrive/Constants';

export type TWithPhysicsProtectedDriver = Readonly<{ [TransformDriver.Physical]: TProtectedTransformDriverFacade<TPhysicsActorDriver> }>;
