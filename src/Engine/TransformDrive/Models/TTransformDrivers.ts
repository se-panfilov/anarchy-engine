import type { TransformDriver } from '@/Engine/TransformDrive/Constants';

import type { TInstantTransformDriver } from './TInstantTransformDriver';
import type { TKinematicTransformDriver } from './TKinematicTransformDriver';
import type { TPhysicsTransformDriver } from './TPhysicsTransformDriver';
import type { TProtectedTransformDriverFacade } from './TProtectedTransformDriverFacade';

export type TTransformDrivers = Readonly<{
  [TransformDriver.Kinematic]: TKinematicTransformDriver;
  [TransformDriver.Physical]: TPhysicsTransformDriver;
  [TransformDriver.Instant]: TInstantTransformDriver;
}>;

export type TProtectedTransformDrivers = Readonly<{
  [TransformDriver.Kinematic]: TProtectedTransformDriverFacade<TKinematicTransformDriver>;
  [TransformDriver.Physical]: TProtectedTransformDriverFacade<TPhysicsTransformDriver>;
  [TransformDriver.Instant]: TProtectedTransformDriverFacade<TInstantTransformDriver>;
}>;
