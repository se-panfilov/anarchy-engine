import GUI from 'lil-gui';
import type { Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs';
import { Euler, Vector3 } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type {
  KeyCode,
  TActor,
  TActorService,
  TAppCanvas,
  TCameraService,
  TCameraWrapper,
  TEngine,
  TIntersectionEvent,
  TIntersectionsWatcher,
  TIntersectionsWatcherService,
  TKeyboardService,
  TMaterialService,
  TMaterialWrapper,
  TModel3d,
  TModel3dRegistry,
  TModels3dService,
  TMouseService,
  TMouseWatcherEvent,
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TSpatialGridWrapper
} from '@/Engine';
import { Engine, isNotDefined, KeysExtra, MaterialType, PrimitiveModel3dType, spaceService, TransformAgent } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const gui: GUI = new GUI();
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  const { actorService, cameraService, intersectionsWatcherService, materialService, models3dService, mouseService, scenesService, spatialGridService } = space.services;
  const { keyboardService } = engine.services;
  const { clickLeftRelease$ } = mouseService;
  const models3dRegistry: TModel3dRegistry = models3dService.getRegistry();

  function init(): void {
    const sceneW: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(sceneW)) throw new Error('Scene is not defined');

    const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');
    if (isNotDefined(grid)) throw new Error('Grid is not defined');

    const planeModel3dF: TModel3d | undefined = models3dRegistry.findByName('surface_model');
    if (isNotDefined(planeModel3dF)) throw new Error('Plane model is not defined');

    sceneW.addModel3d(planeModel3dF);

    const sphereActor: TActor = createSphereActor(grid, actorService, materialService, models3dService);

    gui.add(sphereActor.drive.agent$, 'value').listen();
    gui.add(sphereActor.drive.getPosition(), 'x').listen();
    gui.add(sphereActor.drive.getPosition(), 'y').listen();
    gui.add(sphereActor.drive.getPosition(), 'z').listen();
    const intersectionsWatcher: TIntersectionsWatcher = startIntersections(actorService, cameraService, intersectionsWatcherService, mouseService);

    // TODO implement go to (with current active agent)
    clickLeftRelease$
      .pipe(withLatestFrom(intersectionsWatcher.value$, sphereActor.drive.agent$))
      .subscribe(([, intersection, agent]: [TMouseWatcherEvent, TIntersectionEvent, TransformAgent]): void => {
        moveActorTo(sphereActor, intersection.point, agent);
      });

    changeActorActiveAgent(sphereActor, KeysExtra.Space, keyboardService);
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}

function createSphereActor(grid: TSpatialGridWrapper, actorService: TActorService, materialService: TMaterialService, models3dService: TModels3dService): TActor {
  const sphereMaterial: TMaterialWrapper = materialService.create({ name: 'surface_material', type: MaterialType.Standard, options: { color: '#E91E63' } });

  const sphereModel: TModel3d = models3dService.create({
    name: 'sphere_model',
    model3dSource: PrimitiveModel3dType.Sphere,
    materialSource: sphereMaterial,
    options: { radius: 0.7 },
    castShadow: true,
    receiveShadow: true,
    position: new Vector3(0, 2, 0),
    rotation: new Euler(0, 0, 0)
  });

  return actorService.create({
    name: 'sphere_actor',
    model3dSource: sphereModel,
    position: new Vector3(0, 2, 0),
    rotation: new Euler(0, 0, 0),
    spatial: { grid, isAutoUpdate: true }
  });
}

function startIntersections(actorService: TActorService, cameraService: TCameraService, intersectionsWatcherService: TIntersectionsWatcherService, mouseService: TMouseService): TIntersectionsWatcher {
  const camera: TCameraWrapper | undefined = cameraService.findActive();
  if (isNotDefined(camera)) throw new Error('Camera is not defined');
  const actor: TActor | undefined = actorService.getRegistry().findByName('surface_actor');
  if (isNotDefined(actor)) throw new Error('Actor is not defined');

  return intersectionsWatcherService.create({ actors: [actor], camera, isAutoStart: true, position$: mouseService.position$, tags: [] });
}

function changeActorActiveAgent(actor: TActor, key: KeyCode | KeysExtra, keyboardService: TKeyboardService): Subscription {
  return keyboardService.onKey(key).pressed$.subscribe((): void => {
    const agents: ReadonlyArray<TransformAgent> = Object.values(TransformAgent);
    const index: number = agents.findIndex((agent: TransformAgent): boolean => agent === actor.drive.agent$.value);
    actor.drive.agent$.next(agents[(index + 1) % agents.length]);
  });
}

function moveActorTo(actor: TActor, position: Vector3, agent: TransformAgent): void {
  actor.drive.agent$.next(agent);
  actor.drive.position$.next(position);
  // void moverService.goToPosition(actorMouse.drive.instant.positionConnector, { x: intersection.point.x, z: intersection.point.z }, { duration: 1000, easing: Easing.EaseInCubic });
}
