import { distinctUntilChanged, map } from 'rxjs';
import { Vector3 } from 'three';

import type { TActorWrapperAsync, TIntersectionEvent, TIntersectionsWatcher, TKeyboardService, TRadians } from '@/Engine';
import { getAzimuthRadFromDirection, getElevationRadFromDirection, KeyCode } from '@/Engine';

type TMoveKeys = Readonly<{ Forward: boolean; Left: boolean; Right: boolean; Backward: boolean }>;

export function startMoveActorWithKeyboard(actorW: TActorWrapperAsync, keyboardService: TKeyboardService, mouseLineIntersectionsWatcher: TIntersectionsWatcher): void {
  const speed: number = 15;
  const direction: Vector3 = new Vector3();
  let keyStates: TMoveKeys = { Forward: false, Left: false, Right: false, Backward: false };

  keyboardService.onKey(KeyCode.W).pressed$.subscribe((): void => void (keyStates = { ...keyStates, Forward: true }));
  keyboardService.onKey(KeyCode.A).pressed$.subscribe((): void => void (keyStates = { ...keyStates, Left: true }));
  keyboardService.onKey(KeyCode.S).pressed$.subscribe((): void => void (keyStates = { ...keyStates, Right: true }));
  keyboardService.onKey(KeyCode.D).pressed$.subscribe((): void => void (keyStates = { ...keyStates, Backward: true }));

  // keyboardService.onKey(KeyCode.W).released$.subscribe((): void => void (keyStates = { ...keyStates, Forward: false }));
  // keyboardService.onKey(KeyCode.A).released$.subscribe((): void => void (keyStates = { ...keyStates, Left: false }));
  // keyboardService.onKey(KeyCode.S).released$.subscribe((): void => void (keyStates = { ...keyStates, Right: false }));
  // keyboardService.onKey(KeyCode.D).released$.subscribe((): void => void (keyStates = { ...keyStates, Backward: false }));

  mouseLineIntersectionsWatcher.value$
    .pipe(
      map((intersection: TIntersectionEvent) => getMouseAzimuthAndElevation(intersection.point, actorW.getPosition().entity)),
      distinctUntilChanged()
    )
    .subscribe(({ azimuth, elevation }: Readonly<{ azimuth: TRadians; elevation: TRadians }>): void => {
      // direction = getUpdatedDirection(keyStates, direction, azimuth, elevation, speed);
      // actorW.kinematic.setLinearVelocityFromParams();

      actorW.kinematic.setLinearAzimuthRad(azimuth);
      // console.log(getAzimuthDegFromDirection(actorW.kinematic.getLinearDirection()));
      // console.log(actorW.kinematic.getLinearSpeed(), getAzimuthDegFromDirection(actorW.kinematic.getLinearDirection()));
      actorW.kinematic.setLinearElevationRad(elevation);

      // player.isMoving = player.linearVelocity.lengthSq() > 0;
    });

  keyboardService.onKey(KeyCode.W).pressing$.subscribe((): void => actorW.kinematic.setLinearSpeed(speed));
  keyboardService.onKey(KeyCode.S).pressing$.subscribe((): void => actorW.kinematic.setLinearSpeed(0));
}

function getMouseAzimuthAndElevation(mousePosition: Vector3, playerPosition: Vector3): Readonly<{ azimuth: TRadians; elevation: TRadians }> {
  const direction: Vector3 = mousePosition.clone().sub(playerPosition).normalize();
  const azimuth: number = getAzimuthRadFromDirection(direction);
  const elevation: number = getElevationRadFromDirection(direction);

  return { azimuth, elevation };
}

// function getUpdatedLinearVelocity(keyStates: TMoveKeys, direction: Vector3, azimuth: number, elevation: number, speed: number): Vector3 {
//   if (keyStates.Forward) direction.add(new Vector3(Math.cos(azimuth) * Math.cos(elevation), Math.sin(elevation), Math.sin(azimuth) * Math.cos(elevation)));
//   if (keyStates.Left) direction.add(new Vector3(-Math.cos(azimuth) * Math.cos(elevation), -Math.sin(elevation), -Math.sin(azimuth) * Math.cos(elevation)));
//   if (keyStates.Right) direction.add(new Vector3(Math.sin(azimuth), 0, -Math.cos(azimuth)));
//   if (keyStates.Backward) direction.add(new Vector3(-Math.sin(azimuth), 0, Math.cos(azimuth)));
//
//   // if (keyStates.W) direction.add(new Vector3(Math.cos(azimuth), 0, Math.sin(azimuth)));
//   // if (keyStates.S) direction.add(new Vector3(-Math.cos(azimuth), 0, -Math.sin(azimuth)));
//   // if (keyStates.A) direction.add(new Vector3(Math.sin(azimuth), 0, -Math.cos(azimuth)));
//   // if (keyStates.D) direction.add(new Vector3(-Math.sin(azimuth), 0, Math.cos(azimuth)));
//
//   return direction.normalize().multiplyScalar(speed);
// }
