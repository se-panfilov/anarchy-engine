import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo } from '@/App/Levels/Utils';
import type {
  TActor,
  TActorRegistry,
  TAppCanvas,
  TCameraWrapper,
  TEngine,
  TIntersectionEvent,
  TIntersectionsWatcher,
  TLoopTimes,
  TModel3d,
  TModel3dRegistry,
  TSceneWrapper,
  TSpace,
  TSpaceConfig
} from '@/Engine';
import { ambientContext, Engine, isNotDefined, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  const { actorService, cameraService, intersectionsWatcherService, loopService, models3dService, mouseService, scenesService } = space.services;
  const models3dRegistry: TModel3dRegistry = models3dService.getRegistry();
  const actorRegistry: TActorRegistry = actorService.getRegistry();

  function init(): void {
    const sceneW: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(sceneW)) throw new Error('Scene is not defined');

    addGizmo(space.services, ambientContext.screenSizeWatcher, { placement: 'bottom-left' });

    const planeModel3dF: TModel3d | undefined = models3dRegistry.findByName('surface_model');
    if (isNotDefined(planeModel3dF)) throw new Error('Plane model is not defined');

    sceneW.addModel3d(planeModel3dF);

    const actor: TActor | undefined = actorRegistry.findByName('sphere_actor');
    if (isNotDefined(actor)) throw new Error('Actor is not defined');

    watchIntersections([actor]);

    loopService.tick$.subscribe(({ elapsedTime }: TLoopTimes): void => {
      actor.drive.default.setX(Math.sin(elapsedTime) * 8);
      actor.drive.default.setZ(Math.cos(elapsedTime) * 8);
      // actor.drive.position$.next(new Vector3(Math.sin(elapsedTime) * 8, actor.drive.getPosition().y, Math.cos(elapsedTime) * 8));
    });
  }

  function watchIntersections(actors: ReadonlyArray<TActor>): TIntersectionsWatcher {
    const camera: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(camera)) throw new Error('Camera is not defined');

    const intersectionsWatcher: TIntersectionsWatcher = intersectionsWatcherService.create({ camera, actors, position$: mouseService.position$, isAutoStart: true });

    intersectionsWatcher.value$.subscribe((obj: TIntersectionEvent): void => console.log('intersect obj', obj));
    mouseService.clickLeftRelease$.subscribe((): void => console.log('int click:'));

    return intersectionsWatcher.start();
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
