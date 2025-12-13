import { World } from '@dimforge/rapier3d';

import type { TLoopService } from '@/Engine/Loop';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { STANDARD_GRAVITY } from '@/Engine/Physics/Constants';
import type {
  TPhysicsBodyFacade,
  TPhysicsBodyFactory,
  TPhysicsBodyParams,
  TPhysicsBodyRegistry,
  TPhysicsBodyService,
  TPhysicsDebugRenderer,
  TPhysicsPresetParams,
  TPhysicsPresetsService,
  TPhysicsWorldParams,
  TWithPresetNamePhysicsBodyConfig
} from '@/Engine/Physics/Models';
import { isPhysicsBodyParamsComplete, PhysicsDebugRenderer } from '@/Engine/Physics/Utils';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TOptional } from '@/Engine/Utils';
import { isNotDefined } from '@/Engine/Utils';
import type { TVector3Wrapper } from '@/Engine/Vector';

export function PhysicsBodyService(factory: TPhysicsBodyFactory, registry: TPhysicsBodyRegistry, physicsPresetService: TPhysicsPresetsService, scene: TSceneWrapper): TPhysicsBodyService {
  let world: World | undefined;
  factory.entityCreated$.subscribe((facade: TPhysicsBodyFacade): void => registry.add(facade));

  const create = (params: TPhysicsBodyParams): TPhysicsBodyFacade | never => {
    if (isNotDefined(world)) throw new Error('Cannot create physics body: world is not defined');
    return factory.create(params, { world });
  };

  const createWithPreset = (params: TOptional<TPhysicsBodyParams>, preset: TPhysicsPresetParams): TPhysicsBodyFacade | never => {
    const fullParams: TPhysicsBodyParams | TOptional<TPhysicsBodyParams> = { ...preset, ...params };
    if (!isPhysicsBodyParamsComplete(fullParams)) throw new Error('Cannot create physics body: params are lacking of mandatory fields');

    return create(fullParams);
  };

  const createWithPresetName = (params: TOptional<TPhysicsBodyParams>, presetName: string): TPhysicsBodyFacade | never => {
    const preset: TPhysicsPresetParams | undefined = physicsPresetService.getPresetByName(presetName);
    if (isNotDefined(preset)) throw new Error(`Cannot create physics body: preset with name "${presetName}" not found`);
    return createWithPreset(params, preset);
  };

  const createFromConfig = (physics: ReadonlyArray<TWithPresetNamePhysicsBodyConfig>): void => {
    physics.forEach((config: TWithPresetNamePhysicsBodyConfig): TPhysicsBodyFacade => {
      return create(physicsPresetService.getMergedConfigWithPresetParams(config, factory));
    });
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

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
    world?.free();
  });

  return {
    create,
    createWithPreset,
    createWithPresetName,
    createFromConfig,
    createWorld,
    getDebugRenderer,
    getWorld: (): World | undefined => world,
    setGravity,
    getFactory: (): TPhysicsBodyFactory => factory,
    getRegistry: (): TPhysicsBodyRegistry => registry,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
