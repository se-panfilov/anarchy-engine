import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithRegistryService } from '@/Engine/Space';

import type { TPhysicsBodyConfig } from './TPhysicsBodyConfig';
import type { TPhysicsBodyParams } from './TPhysicsBodyParams';
import type { TPhysicsPresetRegistry } from './TPhysicsPresetRegistry';

export type TPhysicsPresetsService = TWithRegistryService<TPhysicsPresetRegistry> &
  TDestroyable &
  Readonly<{
    addPresets: (presets: ReadonlyArray<TPhysicsBodyParams>) => void;
    addPresetsFromConfig: (presets: ReadonlyArray<TPhysicsBodyConfig>) => void;
  }>;
