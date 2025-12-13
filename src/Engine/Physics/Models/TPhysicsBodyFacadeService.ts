import type { World } from '@dimforge/rapier3d';

import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';
import type { TVector3Wrapper } from '@/Engine/Vector';

import type { TPhysicsBodyConfig } from './TPhysicsBodyConfig';
import type { TPhysicsBodyFacade } from './TPhysicsBodyFacade';
import type { TPhysicsBodyFacadeFactory } from './TPhysicsBodyFacadeFactory';
import type { TPhysicsBodyFacadeRegistry } from './TPhysicsBodyFacadeRegistry';
import type { TPhysicsBodyParams } from './TPhysicsBodyParams';
import type { TPhysicsDebugRenderer } from './TPhysicsDebugRenderer';
import type { TPhysicsWorldParams } from './TPhysicsWorldParams';

export type TPhysicsBodyFacadeService = TWithCreateService<TPhysicsBodyFacade, TPhysicsBodyParams> &
  TWithCreateFromConfigService<TPhysicsBodyConfig> &
  TWithFactoryService<TPhysicsBodyFacadeFactory> &
  TWithRegistryService<TPhysicsBodyFacadeRegistry> &
  TDestroyable &
  TWithSceneGetterService &
  Readonly<{
    createWorld: (physicsWorldParams: TPhysicsWorldParams) => World;
    getDebugRenderer: () => TPhysicsDebugRenderer;
    setGravity: (vector: TVector3Wrapper) => void;
    getWorld: () => World | undefined;
  }>;
