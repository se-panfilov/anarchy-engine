import { distinctUntilChanged, map } from 'rxjs';
import type { Vector3 } from 'three';

import type { TActorWrapperAsync, TIntersectionEvent, TIntersectionsWatcher, TKeyboardService, TRadians } from '@/Engine';
import { getAzimuthRadFromDirection, getElevationRadFromDirection, KeyCode } from '@/Engine';

type TMoveKeysState = Readonly<{ Forward: boolean; Left: boolean; Right: boolean; Backward: boolean }>;

export function startMoveActorWithKeyboard(actorW: TActorWrapperAsync, keyboardService: TKeyboardService, mouseLineIntersectionsWatcher: TIntersectionsWatcher): void {
  let keyStates: TMoveKeysState = { Forward: false, Left: false, Right: false, Backward: false };
  let baseAzimuthRad: TRadians = 0;

  keyboardService.onKey(KeyCode.W).pressed$.subscribe((): void => void (keyStates = { ...keyStates, Forward: true }));
  keyboardService.onKey(KeyCode.A).pressed$.subscribe((): void => void (keyStates = { ...keyStates, Left: true }));
  keyboardService.onKey(KeyCode.S).pressed$.subscribe((): void => void (keyStates = { ...keyStates, Backward: true }));
  keyboardService.onKey(KeyCode.D).pressed$.subscribe((): void => void (keyStates = { ...keyStates, Right: true }));

  keyboardService.onKey(KeyCode.W).released$.subscribe((): void => void (keyStates = { ...keyStates, Forward: false }));
  keyboardService.onKey(KeyCode.A).released$.subscribe((): void => void (keyStates = { ...keyStates, Left: false }));
  keyboardService.onKey(KeyCode.S).released$.subscribe((): void => void (keyStates = { ...keyStates, Backward: false }));
  keyboardService.onKey(KeyCode.D).released$.subscribe((): void => void (keyStates = { ...keyStates, Right: false }));

  mouseLineIntersectionsWatcher.value$
    .pipe(
      map((intersection: TIntersectionEvent) => getMouseAzimuthAndElevation(intersection.point, actorW.getPosition().entity)),
      distinctUntilChanged()
    )
    .subscribe(({ azimuth }: Readonly<{ azimuth: TRadians; elevation: TRadians }>): void => void (baseAzimuthRad = azimuth));

  // TODO (S.Panfilov) DEBUG: remove. Testing kinematic movement
  setInterval(() => {
    actorW.kinematic.setLinearSpeed(getActorMoveSpeed(keyStates, 5, 4, 3));
    actorW.kinematic.setLinearAzimuthRad(baseAzimuthRad + getActorMoveAzimuthRad(keyStates));
    // actorW.kinematic.setAngularSpeed(5);
    // actorW.kinematic.setAngularAzimuthRad(baseAzimuthRad);
  }, 40);
}

function getMouseAzimuthAndElevation(mousePosition: Vector3, playerPosition: Vector3): Readonly<{ azimuth: TRadians; elevation: TRadians }> {
  const direction: Vector3 = mousePosition.clone().sub(playerPosition).normalize();
  const azimuth: number = getAzimuthRadFromDirection(direction);
  const elevation: number = getElevationRadFromDirection(direction);

  return { azimuth, elevation };
}

function getActorMoveSpeed(keyStates: TMoveKeysState, forwardSpeed: number, sideWalkSpeed: number, backwardSped: number): number {
  const { Forward, Backward, Left, Right } = keyStates;

  //just forward
  if (Forward && !Backward && !Left && !Right) return forwardSpeed;
  //just backward
  if (!Forward && Backward && !Left && !Right) return backwardSped;
  //just left
  if (!Forward && !Backward && Left && !Right) return sideWalkSpeed;
  //just right
  if (!Forward && !Backward && !Left && Right) return sideWalkSpeed;

  //forward and left
  if (Forward && !Backward && Left && !Right) return (forwardSpeed + sideWalkSpeed) / 2;
  //forward and right
  if (Forward && !Backward && !Left && Right) return (forwardSpeed + sideWalkSpeed) / 2;
  //backward and left
  if (!Forward && Backward && Left && !Right) return (backwardSped + sideWalkSpeed) / 2;
  //backward and right
  if (!Forward && Backward && !Left && Right) return (backwardSped + sideWalkSpeed) / 2;

  return 0;
}

function getActorMoveAzimuthRad(keyStates: TMoveKeysState): TRadians {
  const { Forward, Backward, Left, Right } = keyStates;

  //just forward
  if (Forward && !Backward && !Left && !Right) return 0; //0 degrees
  //just backward
  if (!Forward && Backward && !Left && !Right) return Math.PI; //180 degrees
  //just left
  if (!Forward && !Backward && Left && !Right) return -Math.PI / 2; //-90 degrees
  //just right
  if (!Forward && !Backward && !Left && Right) return Math.PI / 2; //90 degrees

  //forward and left
  if (Forward && !Backward && Left && !Right) return -Math.PI / 4; //-45 degrees
  //forward and right
  if (Forward && !Backward && !Left && Right) return Math.PI / 4; //45 degrees
  //backward and left
  if (!Forward && Backward && Left && !Right) return (5 * Math.PI) / 4; //225 degrees
  //backward and right
  if (!Forward && Backward && !Left && Right) return (3 * Math.PI) / 4; //135 degrees

  return 0;
}
