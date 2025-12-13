import type { World } from '@dimforge/rapier3d';

import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithSceneGetterService } from '@/Engine/Space';
import type { TVector3Wrapper } from '@/Engine/Vector';

import type { TPhysicsDebugRenderer } from './TPhysicsDebugRenderer';
import type { TPhysicsObject } from './TPhysicsObject';
import type { TPhysicsObjectFactory } from './TPhysicsObjectFactory';
import type { TPhysicsObjectRegistry } from './TPhysicsObjectRegistry';
import type { TPhysicsPresetConfig } from './TPhysicsPresetConfig';
import type { TPhysicsPresetParams } from './TPhysicsPresetParams';
import type { TPhysicsPresetRegistry } from './TPhysicsPresetRegistry';
import type { TPhysicsWorldParams } from './TPhysicsWorldParams';

export type TPhysicsService = TWithCreateService<TPhysicsObject, TPhysicsPresetParams> &
  TWithCreateFromConfigService<TPhysicsPresetConfig> &
  TWithFactoryService<TPhysicsObjectFactory> &
  TDestroyable &
  TWithSceneGetterService &
  Readonly<{
    createWorld: (physicsWorldParams: TPhysicsWorldParams) => World;
    addPresets: (presets: ReadonlyArray<TPhysicsPresetParams>) => void;
    addPresetsFromConfig: (presets: ReadonlyArray<TPhysicsPresetConfig>) => void;
    getDebugRenderer: () => TPhysicsDebugRenderer;
    getPresetRegistry: () => TPhysicsPresetRegistry;
    getPhysicsObjectsRegistry: () => TPhysicsObjectRegistry;
    setGravity: (vector: TVector3Wrapper) => void;
    getWorld: () => World | undefined;
  }>;
