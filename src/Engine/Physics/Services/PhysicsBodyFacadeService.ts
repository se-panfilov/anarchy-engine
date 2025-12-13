import { World } from '@dimforge/rapier3d';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type {
  TPhysicsBodyConfig,
  TPhysicsBodyFacade,
  TPhysicsBodyFacadeFactory,
  TPhysicsBodyFacadeRegistry,
  TPhysicsBodyFacadeService,
  TPhysicsBodyParams,
  TPhysicsDebugRenderer,
  TPhysicsWorldParams
} from '@/Engine/Physics/Models';
import { PhysicsDebugRenderer } from '@/Engine/Physics/Utils';
import type { TSceneWrapper } from '@/Engine/Scene';
import { isNotDefined } from '@/Engine/Utils';
import type { TVector3Wrapper } from '@/Engine/Vector';

export function PhysicsBodyFacadeService(factory: TPhysicsBodyFacadeFactory, registry: TPhysicsBodyFacadeRegistry, scene: TSceneWrapper): TPhysicsBodyFacadeService {
  let world: World | undefined;
  factory.entityCreated$.subscribe((coordinator: TPhysicsBodyFacade): void => registry.add(coordinator));

  const create = (params: TPhysicsBodyParams): TPhysicsBodyFacade => factory.create(params);
  const createFromConfig = (physics: ReadonlyArray<TPhysicsBodyConfig>): void => {
    physics.forEach((config: TPhysicsBodyConfig): TPhysicsBodyFacade => factory.create(factory.configToParams(config)));
  };

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
    return new World(
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
    );
  }

  const getDebugRenderer = (): TPhysicsDebugRenderer => {
    if (isNotDefined(world)) throw new Error('Cannot get debug renderer: world is not defined');
    return PhysicsDebugRenderer(scene.entity, world);
  };

  function setGravity(vector: TVector3Wrapper): void {
    if (isNotDefined(world)) throw new Error('Cannot set gravity: world is not defined');
    // eslint-disable-next-line functional/immutable-data
    world.gravity = vector.getCoords();
  }

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
    world?.free();
  });

  return {
    create,
    createFromConfig,
    createWorld,
    getDebugRenderer,
    getWorld: (): World | undefined => world,
    setGravity,
    getFactory: (): TPhysicsBodyFacadeFactory => factory,
    getRegistry: (): TPhysicsBodyFacadeRegistry => registry,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
