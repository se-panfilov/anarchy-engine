import type { TAbstractService } from '@Engine/Abstract';
import type { TWithSceneGetterService } from '@Engine/Mixins';
import type { TPhysicsLoop, TPhysicsWorldConfig } from '@Engine/Physics';
import type { World } from '@Enginedimforge/rapier3d';
import type { Vector3 } from 'three';

import type { TPhysicsDebugRenderer } from './TPhysicsDebugRenderer';
import type { TPhysicsWorldParams } from './TPhysicsWorldParams';

export type TPhysicsWorldService = TAbstractService &
  TWithSceneGetterService &
  Readonly<{
    createWorld: (physicsWorldParams: TPhysicsWorldParams) => World;
    getDebugRenderer: (loopService: TPhysicsLoop) => TPhysicsDebugRenderer;
    setGravity: (vector: Vector3) => void;
    findWorld: () => World | undefined;
    getWorld: () => World | never;
    serializeWorld: () => TPhysicsWorldConfig | never;
  }>;
