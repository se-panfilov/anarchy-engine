import type { TPhysicsGlobalParams } from './TPhysicsGlobalParams';
import type { TPhysicsPresetParams } from './TPhysicsPresetParams';

export type TPhysicsParams = Readonly<{
  global?: TPhysicsGlobalParams;
  presets?: ReadonlyArray<TPhysicsPresetParams>;
}>;
