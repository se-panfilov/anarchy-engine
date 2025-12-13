import type { TPhysicsBodyParams } from './TPhysicsBodyParams';
import type { TPhysicsGlobalParams } from './TPhysicsGlobalParams';

export type TPhysicsParams = Readonly<{
  global: TPhysicsGlobalParams;
  presets: ReadonlyArray<TPhysicsBodyParams>;
}>;
