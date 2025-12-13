import { withLatestFrom } from 'rxjs';
import { Clock, Vector3 } from 'three';

import { moveByCircle } from '@/App/Levels/Utils/MoveUtils';
import type { TActor, TActorRegistry, TAudio3dWrapper, TCameraWrapper, TIntersectionEvent, TIntersectionsWatcher, TMouseWatcherEvent, TSceneWrapper, TSpace } from '@/Engine';
import { DebugAudioRenderer, isNotDefined, metersPerSecond, TransformAgent } from '@/Engine';

export function runDelta(space: TSpace): void {
  initAudio(space);

  initKinematic(space);

  space.start$.next(true);
}

function initAudio(space: TSpace): void {
  const { actorService, audioService, scenesService } = space.services;
  const { audioLoop, transformLoop } = space.loops;
  moveByCircle('sphere_actor', actorService, transformLoop, new Clock());

  const gunshotName2: string = 'gunshot_2';

  const scene: TSceneWrapper | undefined = scenesService.findActive();
  if (isNotDefined(scene)) throw new Error('Showcase: No active scene is not found');

  const gunshot2: TAudio3dWrapper | undefined = audioService.getRegistry().findByName(gunshotName2) as TAudio3dWrapper | undefined;
  if (isNotDefined(gunshot2)) throw new Error(`Showcase: Audio "${gunshotName2}" is not found`);
  DebugAudioRenderer(gunshot2, scene, audioLoop);

  setInterval((): void => gunshot2.play$.next(true), 500);

  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const actor: TActor | undefined = actorRegistry.findByName('sphere_actor');
  if (isNotDefined(actor)) throw new Error(`Actor "${'sphere_actor'}" is not defined`);

  transformLoop.tick$.subscribe((): void => {
    // eslint-disable-next-line functional/immutable-data
    gunshot2.drive.connected.positionConnector.x = actor.drive.position$.value.x;
    // eslint-disable-next-line functional/immutable-data
    gunshot2.drive.connected.positionConnector.y = actor.drive.position$.value.y;
    // eslint-disable-next-line functional/immutable-data
    gunshot2.drive.connected.positionConnector.z = actor.drive.position$.value.z;
  });
}

function startIntersections(space: TSpace, camera: TCameraWrapper): TIntersectionsWatcher {
  const { actorService, intersectionsWatcherService, mouseService } = space.services;
  const { intersectionsLoop } = space.loops;
  const actor: TActor | undefined = actorService.getRegistry().findByName('surface_actor');
  if (isNotDefined(actor)) throw new Error('Actor is not defined');

  return intersectionsWatcherService.create({
    name: 'intersection_watcher',
    actors: [actor],
    camera,
    isAutoStart: true,
    position$: mouseService.position$,
    intersectionsLoop
  });
}

function initKinematic(space: TSpace): void {
  const { actorService, cameraService, mouseService } = space.services;

  const { clickLeftRelease$ } = mouseService;

  const camera: TCameraWrapper | undefined = cameraService.findActive();
  if (isNotDefined(camera)) throw new Error('Camera is not defined');

  const intersectionsWatcher: TIntersectionsWatcher = startIntersections(space, camera);
  const actorMouse: TActor | undefined = actorService.getRegistry().findByName('sphere_mouse_actor');
  if (isNotDefined(actorMouse)) throw new Error('Actor mouse is not defined');

  clickLeftRelease$.pipe(withLatestFrom(intersectionsWatcher.value$)).subscribe(([, intersection]: [TMouseWatcherEvent, TIntersectionEvent]): void => {
    if (actorMouse.drive.getActiveAgent().type !== TransformAgent.Kinematic) actorMouse.drive.agent$.next(TransformAgent.Kinematic);
    const position: Vector3 = intersection.point.clone().add(new Vector3(0, 1.5, 0));
    actorMouse.drive.kinematic.moveTo(position, metersPerSecond(15));
  });
}
