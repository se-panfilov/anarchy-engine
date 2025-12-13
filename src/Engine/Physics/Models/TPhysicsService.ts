import type { World } from '@dimforge/rapier3d';

import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';
import type { TVector3Wrapper } from '@/Engine/Vector';

import type { TPhysicsBodyFacade } from './TPhysicsBodyFacade';
import type { TPhysicsBodyFactory } from './TPhysicsBodyFactory';
import type { TPhysicsBodyRegistry } from './TPhysicsBodyRegistry';
import type { TPhysicsDebugRenderer } from './TPhysicsDebugRenderer';
import type { TPhysicsPresetConfig } from './TPhysicsPresetConfig';
import type { TPhysicsPresetParams } from './TPhysicsPresetParams';
import type { TPhysicsPresetRegistry } from './TPhysicsPresetRegistry';
import type { TPhysicsWorldParams } from './TPhysicsWorldParams';

export type TPhysicsService = TWithCreateService<TPhysicsBodyFacade, TPhysicsPresetParams> &
  TWithCreateFromConfigService<TPhysicsPresetConfig> &
  TWithFactoryService<TPhysicsBodyFactory> &
  TWithRegistryService<TPhysicsBodyRegistry> &
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
