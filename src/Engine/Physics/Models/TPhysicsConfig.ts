import type { TPhysicsGlobalConfig } from './TPhysicsGlobalConfig';
import type { TPhysicsPresetConfig } from './TPhysicsPresetConfig';

export type TPhysicsConfig = Readonly<{
  global?: TPhysicsGlobalConfig;
  presets?: ReadonlyArray<TPhysicsPresetConfig>;
  isAutoUpdate?: boolean;
}>;
