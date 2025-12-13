import { World } from '@dimforge/rapier3d';

import { configToParams } from '@/Engine/Physics/Adapters';
import type { TPhysicsDebugRenderer, TPhysicsPresetConfig, TPhysicsPresetParams, TPhysicsPresetRegistry, TPhysicsService, TPhysicsWorldParams } from '@/Engine/Physics/Models';
import { PhysicsDebugRenderer } from '@/Engine/Physics/Utils';
import type { TSceneWrapper } from '@/Engine/Scene';
import { isNotDefined } from '@/Engine/Utils';
import type { TVector3Wrapper } from '@/Engine/Vector';

export function PhysicsService(physicsPresetRegistry: TPhysicsPresetRegistry, scene: TSceneWrapper): TPhysicsService {
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
  const addPresetsFromConfig = (presets: ReadonlyArray<TPhysicsPresetConfig>): void => addPresets(presets.map((preset: TPhysicsPresetConfig): TPhysicsPresetParams => configToParams(preset)));

  return {
    createWorld,
    addPresets,
    addPresetsFromConfig,
    getDebugRenderer,
    getWorld: (): World | undefined => world,
    getPresetRegistry: (): TPhysicsPresetRegistry => physicsPresetRegistry,
    setGravity
  };
}
