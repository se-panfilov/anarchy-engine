import type { TPhysicsBodyParams } from '@Engine/Physics';

import type { TPhysicsWorldParams } from './TPhysicsWorldParams';

export type TPhysicsParams = Readonly<{
  world?: TPhysicsWorldParams;
  bodies?: ReadonlyArray<TPhysicsBodyParams>;
}>;
