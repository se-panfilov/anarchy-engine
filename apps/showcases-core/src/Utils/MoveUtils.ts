import type { TActor, TActorRegistry, TActorService, TMilliseconds, TTransformLoop } from '@hellpig/anarchy-engine';
import type { Subscription } from 'rxjs';
import type { Clock } from 'three';

export function moveByCircle(actorName: string, actorService: TActorService, transformLoop: TTransformLoop, clock: Clock): Subscription {
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const actor: TActor = actorRegistry.getByName(actorName);

  return transformLoop.tick$.subscribe((): void => {
    const elapsedTime: TMilliseconds = clock.getElapsedTime() as TMilliseconds;
    actor.drive.default.setX(Math.sin(elapsedTime) * 8);
    actor.drive.default.setZ(Math.cos(elapsedTime) * 8);
  });
}
