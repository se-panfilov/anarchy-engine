import { World } from '@dimforge/rapier3d';
import type { Subscription } from 'rxjs';
import type { Vector3 } from 'three';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { STANDARD_GRAVITY } from '@/Engine/Physics/Constants';
import type { TPhysicalLoop, TPhysicsDebugRenderer, TPhysicsWorldParams, TPhysicsWorldService } from '@/Engine/Physics/Models';
import { PhysicsDebugRenderer } from '@/Engine/Physics/Renderers';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpaceLoops } from '@/Engine/Space';
import { isNotDefined } from '@/Engine/Utils';

export function PhysicsWorldService(scene: TSceneWrapper, { physicalLoop }: TSpaceLoops): TPhysicsWorldService {
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

  // Auto-update world on every tick of the physical loop
  const loopSub$: Subscription = physicalLoop.tick$.subscribe((): void => world?.step());

  const debugRenderersList: Array<TPhysicsDebugRenderer> = [];

  const getDebugRenderer = (loop: TPhysicalLoop): TPhysicsDebugRenderer => {
    if (isNotDefined(world)) throw new Error('Cannot get debug renderer: world is not defined');
    const res = PhysicsDebugRenderer(scene, world, loop);
    // eslint-disable-next-line functional/immutable-data
    debugRenderersList.push(res);
    return res;
  };

  function setGravity(vector: Vector3): void {
    if (isNotDefined(world)) throw new Error('Cannot set gravity: world is not defined');
    // eslint-disable-next-line functional/immutable-data
    world.gravity = vector;
  }

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    debugRenderersList.forEach((renderer: TPhysicsDebugRenderer): void => renderer.destroy$.next());

    destroySub$.unsubscribe();

    loopSub$?.unsubscribe();
    world?.free();
    world = null as any;
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
