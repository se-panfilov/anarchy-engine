import type { TransformDriver } from '@/Engine/TransformDrive/Constants';

import type { TInstantActorDriver } from './TInstantActorDriver';
import type { TKinematicActorDriver } from './TKinematicActorDriver';
import type { TPhysicsActorDriver } from './TPhysicsActorDriver';
import type { TProtectedDriverFacade } from './TProtectedDriverFacade';

export type TTransformDrivers = Readonly<{
  [TransformDriver.Kinematic]: TKinematicActorDriver;
  [TransformDriver.Physical]: TPhysicsActorDriver;
  [TransformDriver.Instant]: TInstantActorDriver;
}>;

export type TProtectedTransformDrivers = Readonly<{
  [TransformDriver.Kinematic]: TProtectedDriverFacade<TKinematicActorDriver>;
  [TransformDriver.Physical]: TProtectedDriverFacade<TPhysicsActorDriver>;
  [TransformDriver.Instant]: TProtectedDriverFacade<TInstantActorDriver>;
}>;
