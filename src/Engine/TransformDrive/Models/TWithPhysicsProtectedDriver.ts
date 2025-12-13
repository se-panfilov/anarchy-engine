import type { TPhysicsTransformDriver, TProtectedTransformDriverFacade } from '@/Engine/TransformDrive';
import type { TransformDriver } from '@/Engine/TransformDrive/Constants';

export type TWithPhysicsProtectedDriver = Readonly<{ [TransformDriver.Physical]: TProtectedTransformDriverFacade<TPhysicsTransformDriver> }>;
