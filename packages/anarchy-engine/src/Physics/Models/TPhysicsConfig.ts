import type { TPhysicsBodyConfig } from './TPhysicsBodyConfig';
import type { TPhysicsWorldConfig } from './TPhysicsWorldConfig';

export type TPhysicsConfig = Readonly<{
  world?: TPhysicsWorldConfig;
  bodies?: ReadonlyArray<TPhysicsBodyConfig>;
}>;
