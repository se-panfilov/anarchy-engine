import { Clock } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo } from '@/App/Levels/Utils';
import type {
  TActor,
  TActorRegistry,
  TCameraWrapper,
  TIntersectionEvent,
  TIntersectionsWatcher,
  TMilliseconds,
  TModel3d,
  TModels3dRegistry,
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TSpaceLoops,
  TSpaceServices
} from '@/Engine';
import { ambientContext, isNotDefined, spaceService } from '@/Engine';

import spaceConfigJson from './showcase.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(): void {
  const spaces: ReadonlyArray<TSpace> = spaceService.createFromConfig([spaceConfig]);
  // TODO 14-0-0: implement spaceService.findActive()
  const space: TSpace = spaces[0];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): TShowcase {
  console.log('XXX123 showcase');
  const { actorService, models3dService, scenesService } = space.services;
  const { transformLoop } = space.loops;

  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();
  const actorRegistry: TActorRegistry = actorService.getRegistry();

  const sceneW: TSceneWrapper | undefined = scenesService.findActive();
  if (isNotDefined(sceneW)) throw new Error('Scene is not defined');

  addGizmo(space.services, ambientContext.screenSizeWatcher, space.loops, { placement: 'bottom-left' });

  const planeModel3d: TModel3d | undefined = models3dRegistry.findByName('surface_model');
  if (isNotDefined(planeModel3d)) throw new Error('Plane model is not defined');

  sceneW.addModel3d(planeModel3d);

  const actor: TActor | undefined = actorRegistry.findByName('sphere_actor');
  if (isNotDefined(actor)) throw new Error('Actor is not defined');

  watchIntersections([actor], space.services, space.loops);

  const clock: Clock = new Clock();
  transformLoop.tick$.subscribe((): void => {
    const elapsedTime: TMilliseconds = clock.getElapsedTime() as TMilliseconds;
    actor.drive.default.setX(Math.sin(elapsedTime) * 8);
    actor.drive.default.setZ(Math.cos(elapsedTime) * 8);
    // actor.drive.position$.next(new Vector3(Math.sin(elapsedTime) * 8, actor.drive.position$.value.y, Math.cos(elapsedTime) * 8));
  });

  return { start, space };
}

function watchIntersections(actors: ReadonlyArray<TActor>, { cameraService, intersectionsWatcherService, mouseService }: TSpaceServices, { intersectionsLoop }: TSpaceLoops): void {
  const camera: TCameraWrapper | undefined = cameraService.findActive();
  if (isNotDefined(camera)) throw new Error('Camera is not defined');

  const intersectionsWatcher: TIntersectionsWatcher = intersectionsWatcherService.create({ camera, actors, position$: mouseService.position$, isAutoStart: true, intersectionsLoop });

  intersectionsWatcher.value$.subscribe((obj: TIntersectionEvent): void => console.log('intersect obj', obj));
  mouseService.clickLeftRelease$.subscribe((): void => console.log('int click:'));

  return intersectionsWatcher.start$.next();
}
