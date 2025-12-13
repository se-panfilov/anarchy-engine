import { World } from '@dimforge/rapier3d';

import type { TLoopService } from '@/Engine/Loop';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { STANDARD_GRAVITY } from '@/Engine/Physics/Constants';
import type { TPhysicsDebugRenderer, TPhysicsWorldParams, TPhysicsWorldService } from '@/Engine/Physics/Models';
import { PhysicsDebugRenderer } from '@/Engine/Physics/Renderers';
import type { TSceneWrapper } from '@/Engine/Scene';
import { isNotDefined } from '@/Engine/Utils';
import type { TVector3Wrapper } from '@/Engine/Vector';

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

  const getDebugRenderer = (loopService: TLoopService): TPhysicsDebugRenderer => {
    if (isNotDefined(world)) throw new Error('Cannot get debug renderer: world is not defined');
    return PhysicsDebugRenderer(scene, world, loopService);
  };

  function setGravity(vector: TVector3Wrapper): void {
    if (isNotDefined(world)) throw new Error('Cannot set gravity: world is not defined');
    // eslint-disable-next-line functional/immutable-data
    world.gravity = vector.getCoords();
  }

  function step(): void {
    if (isNotDefined(world)) throw new Error('Cannot step: world is not defined');
    world.step();
  }

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    world?.free();
  });

  return {
    createWorld,
    getDebugRenderer,
    getWorld: (): World | undefined => world,
    setGravity,
    getScene: (): TSceneWrapper => scene,
    step,
    ...destroyable
  };
}
