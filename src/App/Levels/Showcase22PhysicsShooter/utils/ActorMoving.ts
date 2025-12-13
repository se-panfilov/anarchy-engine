import { BehaviorSubject, combineLatest, map, Subject } from 'rxjs';
import type { Vector3 } from 'three';

import type { TActorWrapperAsync, TIntersectionEvent, TIntersectionsWatcher, TKeyboardService, TRadians } from '@/Engine';
import { getAzimuthRadFromDirection, getElevationRadFromDirection, KeyCode } from '@/Engine';

type TMoveKeysState = { Forward: boolean; Left: boolean; Right: boolean; Backward: boolean };
type TIntersectionDirection = Readonly<{ azimuth: TRadians; elevation: TRadians }>;

export function startMoveActorWithKeyboard(actorW: TActorWrapperAsync, keyboardService: TKeyboardService, mouseLineIntersectionsWatcher: TIntersectionsWatcher): void {
  const keyStates$: BehaviorSubject<TMoveKeysState> = new BehaviorSubject<TMoveKeysState>({ Forward: false, Left: false, Right: false, Backward: false });
  const intersectionDirection$: Subject<TIntersectionDirection> = new Subject<TIntersectionDirection>();

  keyboardService.onKey(KeyCode.W).pressed$.subscribe((): void => keyStates$.next({ ...keyStates$.value, Forward: true }));
  keyboardService.onKey(KeyCode.A).pressed$.subscribe((): void => keyStates$.next({ ...keyStates$.value, Left: true }));
  keyboardService.onKey(KeyCode.S).pressed$.subscribe((): void => keyStates$.next({ ...keyStates$.value, Backward: true }));
  keyboardService.onKey(KeyCode.D).pressed$.subscribe((): void => keyStates$.next({ ...keyStates$.value, Right: true }));

  keyboardService.onKey(KeyCode.W).released$.subscribe((): void => keyStates$.next({ ...keyStates$.value, Forward: false }));
  keyboardService.onKey(KeyCode.A).released$.subscribe((): void => keyStates$.next({ ...keyStates$.value, Left: false }));
  keyboardService.onKey(KeyCode.S).released$.subscribe((): void => keyStates$.next({ ...keyStates$.value, Backward: false }));
  keyboardService.onKey(KeyCode.D).released$.subscribe((): void => keyStates$.next({ ...keyStates$.value, Right: false }));

  mouseLineIntersectionsWatcher.value$
    .pipe(map((intersection: TIntersectionEvent) => getMouseAzimuthAndElevation(intersection.point, actorW.getPosition().entity)))
    .subscribe((value: TIntersectionDirection): void => intersectionDirection$.next(value));

  combineLatest([keyStates$, intersectionDirection$]).subscribe(([keyStates, { azimuth }]: [TMoveKeysState, TIntersectionDirection]): void => {
    actorW.kinematic.setLinearSpeed(getActorMoveSpeed(keyStates, 5, 4, 3));
    actorW.kinematic.setLinearAzimuthRad(azimuth + getActorMoveAzimuthRad(keyStates));
    // actorW.kinematic.setAngularSpeed(5);
    // actorW.kinematic.setAngularAzimuthRad(baseAzimuthRad);
  });
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

export function moveActorBounce(actorW: TActorWrapperAsync): void {
  actorW.kinematic.setAutoUpdate(true);
  actorW.kinematic.setLinearSpeed(2);
  actorW.kinematic.setLinearAzimuthDeg(180);
}
