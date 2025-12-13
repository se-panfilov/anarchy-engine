import type { TAbstractService } from '@Engine/Abstract';
import { AbstractService } from '@Engine/Abstract';
import { withSceneGetterService } from '@Engine/Mixins';
import { physicWorldToConfig } from '@Engine/Physics';
import { STANDARD_GRAVITY } from '@Engine/Physics/Constants';
import type { TPhysicsDebugRenderer, TPhysicsLoop, TPhysicsWorldConfig, TPhysicsWorldParams, TPhysicsWorldService } from '@Engine/Physics/Models';
import { PhysicsDebugRenderer } from '@Engine/Physics/Renderers';
import type { TSceneWrapper } from '@Engine/Scene';
import type { TSpaceLoops } from '@Engine/Space';
import { isNotDefined, mergeAll } from '@Engine/Utils';
import { World } from '@Enginedimforge/rapier3d';
import type { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs';
import type { Vector3 } from 'three';

export function PhysicsWorldService(scene: TSceneWrapper, { physicsLoop }: TSpaceLoops): TPhysicsWorldService {
  const abstractService: TAbstractService = AbstractService();
  let world: World | undefined;

  function createWorld({ gravity, integrationParameters }: TPhysicsWorldParams): World {
    world = new World(gravity ?? STANDARD_GRAVITY);
    // eslint-disable-next-line functional/immutable-data
    Object.assign(world.integrationParameters, integrationParameters);
    return world;
  }

  // Auto-update world on every tick of the physics loop
  physicsLoop.tick$.pipe(takeUntil(abstractService.destroy$)).subscribe((): void => world?.step());

  const debugRenderersList: Array<TPhysicsDebugRenderer> = [];

  const getDebugRenderer = (loop: TPhysicsLoop): TPhysicsDebugRenderer => {
    if (isNotDefined(world)) throw new Error('Cannot get debug renderer: world is not defined');
    const res: TPhysicsDebugRenderer = PhysicsDebugRenderer(scene, world, loop);
    // eslint-disable-next-line functional/immutable-data
    debugRenderersList.push(res);
    return res;
  };

  function setGravity(vector: Vector3): void {
    if (isNotDefined(world)) throw new Error('Cannot set gravity: world is not defined');
    // eslint-disable-next-line functional/immutable-data
    world.gravity = vector;
  }

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    debugRenderersList.forEach((renderer: TPhysicsDebugRenderer): void => renderer.destroy$.next());

    destroySub$.unsubscribe();

    world?.free();
    world = null as any;
  });

  return mergeAll(abstractService, withSceneGetterService(scene), {
    createWorld,
    getDebugRenderer,
    findWorld: (): World | undefined => world,
    getWorld: (): World | never => {
      if (isNotDefined(world)) throw new Error('[PhysicsWorldService]: Physical world is not defined');
      return world;
    },
    setGravity,
    serializeWorld: (): TPhysicsWorldConfig | never => {
      if (isNotDefined(world)) throw new Error('Cannot serialize world: world is not defined');
      return physicWorldToConfig(world);
    }
  });
}
