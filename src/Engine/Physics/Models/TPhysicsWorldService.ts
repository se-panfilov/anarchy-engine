import type { World } from '@dimforge/rapier3d';

import type { TLoopService } from '@/Engine/Loop';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithSceneGetterService } from '@/Engine/Space';
import type { TVector3Wrapper } from '@/Engine/Vector';

import type { TPhysicsDebugRenderer } from './TPhysicsDebugRenderer';
import type { TPhysicsWorldParams } from './TPhysicsWorldParams';

export type TPhysicsWorldService = TDestroyable &
  TWithSceneGetterService &
  Readonly<{
    createWorld: (physicsWorldParams: TPhysicsWorldParams) => World;
    getDebugRenderer: (loopService: TLoopService) => TPhysicsDebugRenderer;
    setGravity: (vector: TVector3Wrapper) => void;
    getWorld: () => World | undefined;
    step: () => void;
  }>;
