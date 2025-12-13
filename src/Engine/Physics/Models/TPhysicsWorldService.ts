import type { World } from '@dimforge/rapier3d';
import type { Vector3 } from 'three';

import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithSceneGetterService } from '@/Engine/Mixins';
import type { TPhysicalLoop } from '@/Engine/Physics';

import type { TPhysicsDebugRenderer } from './TPhysicsDebugRenderer';
import type { TPhysicsWorldParams } from './TPhysicsWorldParams';

export type TPhysicsWorldService = TAbstractService &
  TWithSceneGetterService &
  Readonly<{
    createWorld: (physicsWorldParams: TPhysicsWorldParams) => World;
    getDebugRenderer: (loopService: TPhysicalLoop) => TPhysicsDebugRenderer;
    setGravity: (vector: Vector3) => void;
    getWorld: () => World | undefined;
  }>;
