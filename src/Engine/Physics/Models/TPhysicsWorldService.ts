import type { World } from '@dimforge/rapier3d';
import type { Vector3 } from 'three/src/math/Vector3';

import type { TAbstractLoopService } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithSceneGetterService } from '@/Engine/Space';

import type { TPhysicsDebugRenderer } from './TPhysicsDebugRenderer';
import type { TPhysicsWorldParams } from './TPhysicsWorldParams';

export type TPhysicsWorldService = TDestroyable &
  TWithSceneGetterService &
  Readonly<{
    createWorld: (physicsWorldParams: TPhysicsWorldParams) => World;
    getDebugRenderer: (loopService: TAbstractLoopService<unknown>) => TPhysicsDebugRenderer;
    setGravity: (vector: Vector3) => void;
    getWorld: () => World | undefined;
  }>;
