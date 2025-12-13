import type { TPhysicsBodyConfig } from './TPhysicsBodyConfig';
import type { TPhysicsGlobalConfig } from './TPhysicsGlobalConfig';

export type TPhysicsConfig = Readonly<{
  global?: TPhysicsGlobalConfig;
  presets?: ReadonlyArray<TPhysicsBodyConfig>;
}>;
