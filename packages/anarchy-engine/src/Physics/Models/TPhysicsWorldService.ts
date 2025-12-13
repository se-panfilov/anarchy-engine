import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import type { TWithSceneGetterService } from '@Anarchy/Engine/Mixins';
import type { World } from '@dimforge/rapier3d';
import type { Vector3 } from 'three';

import type { TPhysicsDebugRenderer } from './TPhysicsDebugRenderer';
import type { TPhysicsLoop } from './TPhysicsLoop';
import type { TPhysicsWorldConfig } from './TPhysicsWorldConfig';
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
