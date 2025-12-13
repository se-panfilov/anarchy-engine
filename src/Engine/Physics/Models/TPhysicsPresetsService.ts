import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithRegistryService } from '@/Engine/Space';

import type { TPhysicsPresetConfig } from './TPhysicsPresetConfig';
import type { TPhysicsPresetParams } from './TPhysicsPresetParams';
import type { TPhysicsPresetRegistry } from './TPhysicsPresetRegistry';

export type TPhysicsPresetsService = TWithRegistryService<TPhysicsPresetRegistry> &
  TDestroyable &
  Readonly<{
    addPresets: (presets: ReadonlyArray<TPhysicsPresetParams>) => void;
    addPresetsFromConfig: (presets: ReadonlyArray<TPhysicsPresetConfig>) => void;
  }>;
