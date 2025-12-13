import { distinctUntilChanged, map } from 'rxjs';
import type { Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

import type { TActorWrapperAsync, TIntersectionEvent, TIntersectionsWatcher, TKeyboardService, TRadians } from '@/Engine';
import { getAzimuthRadFromDirection, getElevationRadFromDirection, KeyCode } from '@/Engine';

type TMoveKeys = Readonly<{ Forward: boolean; Left: boolean; Right: boolean; Backward: boolean }>;

export function startMoveActorWithKeyboard(actorW: TActorWrapperAsync, keyboardService: TKeyboardService, mouseLineIntersectionsWatcher: TIntersectionsWatcher): void {
  const speed: number = 5;
  let keyStates: TMoveKeys = { Forward: false, Left: false, Right: false, Backward: false };

  const azimuthAngleDeviationRad: TRadians = degToRad(45);
  let azimuthDeviationLeft: TRadians = 0;
  let azimuthDeviationRight: TRadians = 0;

  function getAzimuthDeviation(): TRadians {
    return azimuthDeviationLeft + azimuthDeviationRight;
  }

  keyboardService.onKey(KeyCode.W).pressed$.subscribe((): void => void (keyStates = { ...keyStates, Forward: true }));
  keyboardService.onKey(KeyCode.A).pressed$.subscribe((): void => void (keyStates = { ...keyStates, Left: true }));
  keyboardService.onKey(KeyCode.S).pressed$.subscribe((): void => void (keyStates = { ...keyStates, Right: true }));
  keyboardService.onKey(KeyCode.D).pressed$.subscribe((): void => void (keyStates = { ...keyStates, Backward: true }));

  keyboardService.onKey(KeyCode.W).released$.subscribe((): void => void (keyStates = { ...keyStates, Forward: false }));
  keyboardService.onKey(KeyCode.A).released$.subscribe((): void => void (keyStates = { ...keyStates, Left: false }));
  keyboardService.onKey(KeyCode.S).released$.subscribe((): void => void (keyStates = { ...keyStates, Right: false }));
  keyboardService.onKey(KeyCode.D).released$.subscribe((): void => void (keyStates = { ...keyStates, Backward: false }));

  mouseLineIntersectionsWatcher.value$
    .pipe(
      map((intersection: TIntersectionEvent) => getMouseAzimuthAndElevation(intersection.point, actorW.getPosition().entity)),
      distinctUntilChanged()
    )
    .subscribe(({ azimuth, elevation }: Readonly<{ azimuth: TRadians; elevation: TRadians }>): void => {
      // actorW.kinematic.setLinearDirectionFromParamsRad(azimuth, elevation);
      // actorW.kinematic.setLinearAzimuthRad(azimuth);
      // console.log(`result: ${radToDeg(azimuth + getAzimuthDeviation())}, azimuth: ${radToDeg(azimuth)}, deviation: ${radToDeg(getAzimuthDeviation())}`);
      actorW.kinematic.setLinearAzimuthRad(azimuth + getAzimuthDeviation());
    });

  keyboardService.onKey(KeyCode.W).pressed$.subscribe((): void => actorW.kinematic.setLinearSpeed(speed));
  keyboardService.onKey(KeyCode.W).released$.subscribe((): void => actorW.kinematic.setLinearSpeed(0));

  keyboardService.onKey(KeyCode.A).pressed$.subscribe((): void => {
    actorW.kinematic.setLinearSpeed(speed);
    azimuthDeviationLeft = -azimuthAngleDeviationRad;
  });
  keyboardService.onKey(KeyCode.A).released$.subscribe((): void => void (azimuthDeviationLeft = 0));

  keyboardService.onKey(KeyCode.D).pressed$.subscribe((): void => void (azimuthDeviationRight = azimuthAngleDeviationRad));
  keyboardService.onKey(KeyCode.D).released$.subscribe((): void => void (azimuthDeviationRight = 0));
}

function getMouseAzimuthAndElevation(mousePosition: Vector3, playerPosition: Vector3): Readonly<{ azimuth: TRadians; elevation: TRadians }> {
  const direction: Vector3 = mousePosition.clone().sub(playerPosition).normalize();
  const azimuth: number = getAzimuthRadFromDirection(direction);
  const elevation: number = getElevationRadFromDirection(direction);

  return { azimuth, elevation };
}
