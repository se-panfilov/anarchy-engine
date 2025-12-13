import { World } from '@dimforge/rapier3d';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { configToParams } from '@/Engine/Physics/Adapters';
import type {
  TPhysicsBodyFactory,
  TPhysicsBodyRegistry,
  TPhysicsDebugRenderer,
  TPhysicsPresetConfig,
  TPhysicsPresetParams,
  TPhysicsPresetRegistry,
  TPhysicsService,
  TPhysicsWorldParams
} from '@/Engine/Physics/Models';
import { PhysicsDebugRenderer } from '@/Engine/Physics/Utils';
import type { TSceneWrapper } from '@/Engine/Scene';
import { isNotDefined } from '@/Engine/Utils';
import type { TVector3Wrapper } from '@/Engine/Vector';

export function PhysicsService(factory: TPhysicsBodyFactory, registry: TPhysicsBodyRegistry, physicsPresetRegistry: TPhysicsPresetRegistry, scene: TSceneWrapper): TPhysicsService {
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

  const addPresets = (presets: ReadonlyArray<TPhysicsPresetParams>): void => physicsPresetRegistry.add(presets);
  const addPresetsFromConfig = (presets: ReadonlyArray<TPhysicsPresetConfig>): void => addPresets(presets.map(configToParams));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    // TODO (S.Panfilov) fix
    factory.destroy();
    registry.destroy();
    physicsPresetRegistry.destroy();
    world.dispose(); //dispose?
    //destroy debug renderer?
  });

  return {
    createWorld,
    addPresets,
    addPresetsFromConfig,
    getDebugRenderer,
    getWorld: (): World | undefined => world,
    setGravity,
    getFactory: (): TPhysicsBodyFactory => factory,
    getRegistry: (): TPhysicsBodyRegistry => registry,
    getPresetRegistry: (): TPhysicsPresetRegistry => physicsPresetRegistry,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
