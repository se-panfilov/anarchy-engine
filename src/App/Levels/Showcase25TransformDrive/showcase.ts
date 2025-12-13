import GUI from 'lil-gui';
import type { Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs';
import { Euler, Vector3 } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type {
  KeyCode,
  TActor,
  TAppCanvas,
  TCameraWrapper,
  TEngine,
  TIntersectionEvent,
  TIntersectionsWatcher,
  TKeyboardService,
  TMaterialWrapper,
  TModel3d,
  TModel3dRegistry,
  TMouseWatcherEvent,
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TSpaceServices,
  TSpatialGridWrapper
} from '@/Engine';
import { Engine, isNotDefined, KeysExtra, MaterialType, PrimitiveModel3dType, spaceService, TransformAgent } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const gui: GUI = new GUI();
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  const { models3dService, mouseService, scenesService, spatialGridService } = space.services;
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

    const sphereActor: TActor = createActor('sphere', grid, new Vector3(0, 2, 0), space.services);
    const repeaterActor: TActor = createActor('repeater', grid, new Vector3(0, 6, 0), space.services);

    sphereActor.drive.position$.subscribe((position: Vector3): void => {
      // eslint-disable-next-line functional/immutable-data
      repeaterActor.drive.instant.positionConnector.x = position.x;
      // eslint-disable-next-line functional/immutable-data
      repeaterActor.drive.instant.positionConnector.y = position.y + 4;
      // eslint-disable-next-line functional/immutable-data
      repeaterActor.drive.instant.positionConnector.z = position.z;
    });

    const sphereActorFolder: GUI = gui.addFolder('Sphere Actor');
    sphereActorFolder.add(sphereActor.drive.agent$, 'value').listen();
    sphereActorFolder.add(sphereActor.drive.getPosition(), 'x').listen();
    sphereActorFolder.add(sphereActor.drive.getPosition(), 'y').listen();
    sphereActorFolder.add(sphereActor.drive.getPosition(), 'z').listen();
    const repeaterActorFolder: GUI = gui.addFolder('Repeater Actor');
    repeaterActorFolder.add(repeaterActor.drive.agent$, 'value').listen();
    repeaterActorFolder.add(repeaterActor.drive.getPosition(), 'x').listen();
    repeaterActorFolder.add(repeaterActor.drive.getPosition(), 'y').listen();
    repeaterActorFolder.add(repeaterActor.drive.getPosition(), 'z').listen();

    const intersectionsWatcher: TIntersectionsWatcher = startIntersections(space.services);

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

function createActor(name: string, grid: TSpatialGridWrapper, position: Vector3, { actorService, materialService, models3dService }: TSpaceServices): TActor {
  const material: TMaterialWrapper = materialService.create({ name: `${name}_material`, type: MaterialType.Standard, options: { color: '#E91E63' } });

  const model: TModel3d = models3dService.create({
    name: `${name}_model`,
    model3dSource: PrimitiveModel3dType.Sphere,
    materialSource: material,
    options: { radius: 0.7 },
    castShadow: true,
    receiveShadow: true,
    position: position.clone(),
    rotation: new Euler(0, 0, 0)
  });

  return actorService.create({
    name: `${name}_actor`,
    model3dSource: model,
    position: position.clone(),
    rotation: new Euler(0, 0, 0),
    spatial: { grid, isAutoUpdate: true }
  });
}

function startIntersections({ actorService, cameraService, intersectionsWatcherService, mouseService }: TSpaceServices): TIntersectionsWatcher {
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
  switch (agent) {
    case TransformAgent.Kinematic:
      // TODO (S.Panfilov) 8.0.0. MODELS: Implement Kinematic movement
      break;
    case TransformAgent.Instant:
      // TODO (S.Panfilov) 8.0.0. MODELS: fix this
      actor.drive.instant.setPosition(position);
      break;
    case TransformAgent.Physical:
      // TODO (S.Panfilov) 8.0.0. MODELS: Implement Physics movement
      break;
    default:
      throw new Error(`Unknown agent: ${agent}`);
  }
  // actor.drive.position$.next(position);
  // void moverService.goToPosition(actorMouse.drive.instant.positionConnector, { x: intersection.point.x, z: intersection.point.z }, { duration: 1000, easing: Easing.EaseInCubic });
}
