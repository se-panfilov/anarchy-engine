import type { TEntitiesService } from '@/Engine/Abstract';
import type { TWithRegistryService } from '@/Engine/Mixins';

import type { TPhysicsBodyFactory } from './TPhysicsBodyFactory';
import type { TPhysicsBodyParams } from './TPhysicsBodyParams';
import type { TPhysicsPresetConfig } from './TPhysicsPresetConfig';
import type { TPhysicsPresetParams } from './TPhysicsPresetParams';
import type { TPhysicsPresetRegistry } from './TPhysicsPresetRegistry';
import type { TWithPresetNamePhysicsBodyConfig } from './TWithPresetNamePhysicsBodyConfig';

export type TPhysicsPresetRServiceWithRegistry = TWithRegistryService<TPhysicsPresetRegistry>;

export type TPhysicsPresetsService = TEntitiesService &
  TPhysicsPresetRServiceWithRegistry &
  Readonly<{
    addPresets: (presets: ReadonlyArray<TPhysicsPresetParams>) => void;
    addPresetsFromConfig: (presets: ReadonlyArray<TPhysicsPresetConfig>) => void;
    getPresetByName: (name: string) => TPhysicsPresetParams | undefined;
    getMergedConfigWithPresetParams: (config: TWithPresetNamePhysicsBodyConfig, factory: TPhysicsBodyFactory) => TPhysicsBodyParams;
  }>;
