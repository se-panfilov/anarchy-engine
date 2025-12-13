import type { World } from '@dimforge/rapier3d';

import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';
import type { TVector3Wrapper } from '@/Engine/Vector';

import type { TPhysicsDebugRenderer } from './TPhysicsDebugRenderer';
import type { TPhysicsFactory } from './TPhysicsFactory';
import type { TPhysicsPresetConfig } from './TPhysicsPresetConfig';
import type { TPhysicsPresetParams } from './TPhysicsPresetParams';
import type { TPhysicsPresetRegistry } from './TPhysicsPresetRegistry';
import type { TPhysicsRegistry } from './TPhysicsRegistry';
import type { TPhysicsWorldParams } from './TPhysicsWorldParams';
import type { TPhysicsWrapper } from './TPhysicsWrapper';

export type TPhysicsService = TWithCreateService<TPhysicsWrapper, TPhysicsPresetParams> &
  TWithCreateFromConfigService<TPhysicsPresetConfig> &
  TWithFactoryService<TPhysicsFactory> &
  TWithRegistryService<TPhysicsRegistry> &
  TDestroyable &
  TWithSceneGetterService &
  Readonly<{
    createWorld: (physicsWorldParams: TPhysicsWorldParams) => World;
    addPresets: (presets: ReadonlyArray<TPhysicsPresetParams>) => void;
    addPresetsFromConfig: (presets: ReadonlyArray<TPhysicsPresetConfig>) => void;
    getDebugRenderer: () => TPhysicsDebugRenderer;
    getPresetRegistry: () => TPhysicsPresetRegistry;
    setGravity: (vector: TVector3Wrapper) => void;
    getWorld: () => World | undefined;
  }>;
