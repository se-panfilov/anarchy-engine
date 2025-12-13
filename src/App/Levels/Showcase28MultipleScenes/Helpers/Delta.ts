import { Clock } from 'three';

import { moveByCircle } from '@/App/Levels/Utils/MoveUtils';
import type { TActor, TActorRegistry, TAudio3dWrapper, TSceneWrapper, TSpace } from '@/Engine';
import { DebugAudioRenderer, isNotDefined } from '@/Engine';

export function runDelta(space: TSpace): void {
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

  space.start$.next(true);
}
