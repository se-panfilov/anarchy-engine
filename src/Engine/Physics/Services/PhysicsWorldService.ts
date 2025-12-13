import { World } from '@dimforge/rapier3d';
import type { Subscription } from 'rxjs';
import type { Vector3 } from 'three/src/math/Vector3';

import type { TAbstractLoopService, TAbstractReadonlyLoopServiceWith } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { STANDARD_GRAVITY } from '@/Engine/Physics/Constants';
import type { TPhysicsDebugRenderer, TPhysicsWorldParams, TPhysicsWorldService } from '@/Engine/Physics/Models';
import { PhysicsDebugRenderer } from '@/Engine/Physics/Renderers';
import type { TSceneWrapper } from '@/Engine/Scene';
import { isNotDefined } from '@/Engine/Utils';

export function PhysicsWorldService(scene: TSceneWrapper): TPhysicsWorldService {
  let world: World | undefined;

  function createWorld({
    gravity,
    rawIntegrationParameters,
    rawIslands,
    rawBroadPhase,
    rawNarrowPhase,
    rawBodies,
    rawColliders,
    rawImpulseJoints,
    rawMultibodyJoints,
    rawCCDSolver,
    rawQueryPipeline,
    rawPhysicsPipeline,
    rawSerializationPipeline,
    rawDebugRenderPipeline
  }: TPhysicsWorldParams): World {
    world = new World(
      gravity ?? STANDARD_GRAVITY,
      rawIntegrationParameters,
      rawIslands,
      rawBroadPhase,
      rawNarrowPhase,
      rawBodies,
      rawColliders,
      rawImpulseJoints,
      rawMultibodyJoints,
      rawCCDSolver,
      rawQueryPipeline,
      rawPhysicsPipeline,
      rawSerializationPipeline,
      rawDebugRenderPipeline
    );
    return world;
  }

  const getDebugRenderer = (loopService: TAbstractLoopService<unknown> | TAbstractReadonlyLoopServiceWith<unknown>): TPhysicsDebugRenderer => {
    if (isNotDefined(world)) throw new Error('Cannot get debug renderer: world is not defined');
    return PhysicsDebugRenderer(scene, world, loopService);
  };

  function setGravity(vector: Vector3): void {
    if (isNotDefined(world)) throw new Error('Cannot set gravity: world is not defined');
    // eslint-disable-next-line functional/immutable-data
    world.gravity = vector;
  }

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    world?.free();
  });

  return {
    createWorld,
    getDebugRenderer,
    getWorld: (): World | undefined => world,
    setGravity,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
