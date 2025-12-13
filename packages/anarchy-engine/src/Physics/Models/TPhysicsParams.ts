import type { TPhysicsBodyParams } from './TPhysicsBodyParams';
import type { TPhysicsWorldParams } from './TPhysicsWorldParams';

export type TPhysicsParams = Readonly<{
  world?: TPhysicsWorldParams;
  bodies?: ReadonlyArray<TPhysicsBodyParams>;
}>;
