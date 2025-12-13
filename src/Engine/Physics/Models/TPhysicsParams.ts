import type { TPhysicsBodyParams } from '@/Engine/Physics';

import type { TPhysicsWorldParams } from './TPhysicsWorldParams';

export type TPhysicsParams = Readonly<{
  global?: TPhysicsWorldParams;
  bodies?: ReadonlyArray<TPhysicsBodyParams>;
}>;
