import type { TPhysicsBodyParams } from '@/Physics';

import type { TPhysicsWorldParams } from './TPhysicsWorldParams';

export type TPhysicsParams = Readonly<{
  world?: TPhysicsWorldParams;
  bodies?: ReadonlyArray<TPhysicsBodyParams>;
}>;
