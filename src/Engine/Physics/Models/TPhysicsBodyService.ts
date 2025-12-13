import type { World } from '@dimforge/rapier3d';

import type { TLoopService } from '@/Engine/Loop';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';
import type { TOptional } from '@/Engine/Utils';
import type { TVector3Wrapper } from '@/Engine/Vector';

import type { TPhysicsBodyFacade } from './TPhysicsBodyFacade';
import type { TPhysicsBodyFactory } from './TPhysicsBodyFactory';
import type { TPhysicsBodyParams } from './TPhysicsBodyParams';
import type { TPhysicsBodyRegistry } from './TPhysicsBodyRegistry';
import type { TPhysicsDebugRenderer } from './TPhysicsDebugRenderer';
import type { TPhysicsPresetParams } from './TPhysicsPresetParams';
import type { TPhysicsWorldParams } from './TPhysicsWorldParams';
import type { TWithPresetNamePhysicsBodyConfig } from './TWithPresetNamePhysicsBodyConfig';

export type TPhysicsBodyService = TWithCreateService<TPhysicsBodyFacade, TPhysicsBodyParams> &
  TWithCreateFromConfigService<TWithPresetNamePhysicsBodyConfig> &
  TWithFactoryService<TPhysicsBodyFactory> &
  TWithRegistryService<TPhysicsBodyRegistry> &
  TDestroyable &
  TWithSceneGetterService &
  Readonly<{
    createWithPreset: (params: TOptional<TPhysicsBodyParams>, preset: TPhysicsPresetParams) => TPhysicsBodyFacade | never;
    createWithPresetName: (params: TOptional<TPhysicsBodyParams>, presetName: string) => TPhysicsBodyFacade | never;
    createWorld: (physicsWorldParams: TPhysicsWorldParams) => World;
    getDebugRenderer: (loopService: TLoopService) => TPhysicsDebugRenderer;
    setGravity: (vector: TVector3Wrapper) => void;
    getWorld: () => World | undefined;
  }>;
