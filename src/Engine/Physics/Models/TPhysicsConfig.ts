import type { TPhysicsBodyConfig } from '@/Engine/Physics';

import type { TPhysicsWorldConfig } from './TPhysicsWorldConfig';

export type TPhysicsConfig = Readonly<{
  global?: TPhysicsWorldConfig;
  bodies?: ReadonlyArray<TPhysicsBodyConfig>;
}>;
