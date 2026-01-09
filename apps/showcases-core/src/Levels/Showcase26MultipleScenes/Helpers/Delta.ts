import type { TActor, TActorRegistry, TAnyCameraWrapper, TAudio3dWrapper, TIntersectionEvent, TIntersectionsCameraWatcher, TMouseWatcherEvent, TSceneWrapper, TSpace } from '@Anarchy/Engine';
import { DebugAudioRenderer, metersPerSecond } from '@Anarchy/Engine';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import { withLatestFrom } from 'rxjs';
import { Clock, Vector3 } from 'three';

import { createReactiveLineFromActor } from '@/Levels/Showcase23TransformDrive/Utils';
import { watchActiveRendererReady } from '@/Utils';
import { moveByCircle } from '@/Utils/MoveUtils';

import { addParticles } from './Utils';

export function runDelta(space: TSpace): void {
  watchActiveRendererReady(space);
  initAudio(space);
  initKinematic(space);
  addParticles(space);

  space.start$.next(true);
}

function initAudio(space: TSpace): void {
  const { actorService, audioService, scenesService } = space.services;
  const { audioLoop, transformLoop } = space.loops;
  moveByCircle('sphere_actor', actorService, transformLoop, new Clock());

  const gunshotName2: string = 'gunshot_2';
  const sceneW: TSceneWrapper = scenesService.getActive();

  const gunshot2: TAudio3dWrapper = audioService.getRegistry().getByName(gunshotName2) as TAudio3dWrapper;
  DebugAudioRenderer(gunshot2, sceneW, audioLoop);

  setInterval((): void => gunshot2.play$.next(true), 500);

  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const actor: TActor = actorRegistry.getByName('sphere_actor');

  transformLoop.tick$.subscribe((): void => {
    // eslint-disable-next-line functional/immutable-data
    gunshot2.drive.connected.positionConnector.x = actor.drive.position$.value.x;
    // eslint-disable-next-line functional/immutable-data
    gunshot2.drive.connected.positionConnector.y = actor.drive.position$.value.y;
    // eslint-disable-next-line functional/immutable-data
    gunshot2.drive.connected.positionConnector.z = actor.drive.position$.value.z;
  });
}

function startIntersections(space: TSpace, camera: TAnyCameraWrapper): TIntersectionsCameraWatcher {
  const { actorService, intersectionsWatcherService, mouseService } = space.services;
  const { intersectionsLoop } = space.loops;
  const surfaceActor: TActor = actorService.getRegistry().getByName('surface_actor');

  return intersectionsWatcherService.create({
    name: 'intersection_watcher',
    actors: [surfaceActor],
    camera,
    isAutoStart: true,
    position$: mouseService.normalizedPosition$,
    intersectionsLoop
  }) as TIntersectionsCameraWatcher;
}

function initKinematic(space: TSpace): void {
  const { actorService, cameraService, mouseService, scenesService } = space.services;

  const { clickLeftRelease$ } = mouseService;

  const camera: TAnyCameraWrapper = cameraService.getActive();
  const intersectionsWatcher: TIntersectionsCameraWatcher = startIntersections(space, camera);
  const actorMouse: TActor = actorService.getRegistry().getByName('sphere_mouse_actor');

  const { line } = createReactiveLineFromActor('#E91E63', actorMouse, intersectionsWatcher);
  scenesService.getActive().entity.add(line);

  clickLeftRelease$.pipe(withLatestFrom(intersectionsWatcher.value$)).subscribe(([, intersection]: [TMouseWatcherEvent, TIntersectionEvent]): void => {
    if (isNotDefined(intersection)) throw new Error('Intersection not defined');
    const position: Vector3 = intersection.point.clone().add(new Vector3(0, 1.5, 0));
    actorMouse.drive.kinematic.moveTo(position, metersPerSecond(15));
  });
}
