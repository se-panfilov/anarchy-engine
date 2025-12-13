import type { TPhysicsBodyConfig } from '@Anarchy/Engine/Physics';

import type { TPhysicsWorldConfig } from './TPhysicsWorldConfig';

export type TPhysicsConfig = Readonly<{
  world?: TPhysicsWorldConfig;
  bodies?: ReadonlyArray<TPhysicsBodyConfig>;
}>;
