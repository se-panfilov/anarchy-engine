import GUI from 'lil-gui';
import { withLatestFrom } from 'rxjs';
import { Vector3 } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type {
  TActor,
  TAppCanvas,
  TEngine,
  TIntersectionEvent,
  TIntersectionsWatcher,
  TModel3d,
  TModel3dRegistry,
  TMouseWatcherEvent,
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TSpatialGridWrapper
} from '@/Engine';
import { Engine, isNotDefined, KeysExtra, spaceService, TransformAgent } from '@/Engine';

import spaceConfig from './showcase.json';
import { addActorFolderGui, changeActorActiveAgent, createActor, createRepeaterActor, startIntersections } from './Utils';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const gui: GUI = new GUI();
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  const { models3dService, mouseService, scenesService, spatialGridService } = space.services;
  const { keyboardService } = engine.services;
  const { clickLeftRelease$ } = mouseService;
  const models3dRegistry: TModel3dRegistry = models3dService.getRegistry();

  const mode = { isTeleportationMode: false };

  function init(): void {
    const sceneW: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(sceneW)) throw new Error('Scene is not defined');

    const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');
    if (isNotDefined(grid)) throw new Error('Grid is not defined');

    const planeModel3dF: TModel3d | undefined = models3dRegistry.findByName('surface_model');
    if (isNotDefined(planeModel3dF)) throw new Error('Plane model is not defined');

    console.log('Click "space" to change actor movement mode ("agent")');

    sceneW.addModel3d(planeModel3dF);

    const actorCoords = new Vector3(0, 2, 0);
    const sphereActor: TActor = createActor('sphere', grid, actorCoords, '#E91E63', space.services);
    gui.add(mode, 'isTeleportationMode').name('Teleportation mode');
    addActorFolderGui(gui, sphereActor);

    createRepeaterActor(sphereActor, { x: 0, y: -4, z: 0 }, grid, gui, space.services);

    const intersectionsWatcher: TIntersectionsWatcher = startIntersections(space.services);

    clickLeftRelease$
      .pipe(withLatestFrom(intersectionsWatcher.value$, sphereActor.drive.agent$))
      .subscribe(([, intersection, agent]: [TMouseWatcherEvent, TIntersectionEvent, TransformAgent]): void => {
        console.log('XXX', intersection.point);
        moveActorTo(sphereActor, intersection.point, agent, mode.isTeleportationMode);
      });

    changeActorActiveAgent(sphereActor, KeysExtra.Space, keyboardService);
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}

function moveActorTo(actor: TActor, position: Vector3, agent: TransformAgent, isTeleportationMode: boolean): void | never {
  if (isTeleportationMode) return actor.drive.position$.next(position);

  switch (agent) {
    case TransformAgent.Kinematic:
      // TODO (S.Panfilov) 8.0.0. MODELS: Implement Kinematic movement
      return undefined;
    case TransformAgent.Instant:
      // TODO (S.Panfilov) 8.0.0. MODELS: fix this
      // actor.drive.instant.setPosition(position);
      return undefined;
    case TransformAgent.Physical:
      // TODO (S.Panfilov) 8.0.0. MODELS: Implement Physics movement
      return undefined;
    default:
      throw new Error(`Unknown agent: ${agent}`);
  }
}
