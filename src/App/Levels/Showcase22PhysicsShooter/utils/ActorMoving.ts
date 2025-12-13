import { BehaviorSubject, combineLatest, map, Subject } from 'rxjs';

import type { TActor, TIntersectionEvent, TIntersectionsWatcher, TKeyboardService, TMetersPerSecond, TRadians } from '@/Engine';
import { getMouseAzimuthAndElevation, KeyCode, metersPerSecond } from '@/Engine';
import { degrees, radians } from '@/Engine/Measurements/Utils';

type TMoveKeysState = { Forward: boolean; Left: boolean; Right: boolean; Backward: boolean };
type TIntersectionDirection = Readonly<{ azimuth: TRadians; elevation: TRadians }>;

export function startMoveActorWithKeyboard(actor: TActor, keyboardService: TKeyboardService, mouseLineIntersectionsWatcher: TIntersectionsWatcher): void {
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

  mouseLineIntersectionsWatcher.value$.pipe(map((intersection: TIntersectionEvent) => getMouseAzimuthAndElevation(intersection.point, actor.drive.getPosition()))).subscribe(intersectionDirection$);

  combineLatest([keyStates$, intersectionDirection$]).subscribe(([keyStates, { azimuth }]: [TMoveKeysState, TIntersectionDirection]): void => {
    actor.drive.kinematic.setLinearSpeed(getActorMoveSpeed(keyStates, 5, 4, 3));
    actor.drive.kinematic.setLinearAzimuthRad(radians(azimuth + getActorMoveAzimuthRad(keyStates)));
  });
}

function getActorMoveSpeed(keyStates: TMoveKeysState, forwardSpeed: number, sideWalkSpeed: number, backwardSped: number): TMetersPerSecond {
  const { Forward, Backward, Left, Right } = keyStates;

  //just forward
  if (Forward && !Backward && !Left && !Right) return metersPerSecond(forwardSpeed);
  //just backward
  if (!Forward && Backward && !Left && !Right) return metersPerSecond(backwardSped);
  //just left
  if (!Forward && !Backward && Left && !Right) return metersPerSecond(sideWalkSpeed);
  //just right
  if (!Forward && !Backward && !Left && Right) return metersPerSecond(sideWalkSpeed);

  //forward and left
  if (Forward && !Backward && Left && !Right) return metersPerSecond((forwardSpeed + sideWalkSpeed) / 2);
  //forward and right
  if (Forward && !Backward && !Left && Right) return metersPerSecond((forwardSpeed + sideWalkSpeed) / 2);
  //backward and left
  if (!Forward && Backward && Left && !Right) return metersPerSecond((backwardSped + sideWalkSpeed) / 2);
  //backward and right
  if (!Forward && Backward && !Left && Right) return metersPerSecond((backwardSped + sideWalkSpeed) / 2);

  return metersPerSecond(0);
}

function getActorMoveAzimuthRad(keyStates: TMoveKeysState): TRadians {
  const { Forward, Backward, Left, Right } = keyStates;

  //just forward
  if (Forward && !Backward && !Left && !Right) return radians(0); //0 degrees
  //just backward
  if (!Forward && Backward && !Left && !Right) return radians(Math.PI); //180 degrees
  //just left
  if (!Forward && !Backward && Left && !Right) return radians(-Math.PI / 2); //-90 degrees
  //just right
  if (!Forward && !Backward && !Left && Right) return radians(Math.PI / 2); //90 degrees

  //forward and left
  if (Forward && !Backward && Left && !Right) return radians(-Math.PI / 4); //-45 degrees
  //forward and right
  if (Forward && !Backward && !Left && Right) return radians(Math.PI / 4); //45 degrees
  //backward and left
  if (!Forward && Backward && Left && !Right) return radians((5 * Math.PI) / 4); //225 degrees
  //backward and right
  if (!Forward && Backward && !Left && Right) return radians((3 * Math.PI) / 4); //135 degrees

  return radians(0);
}

export function moveActorBounce(actor: TActor, speedMPS: number, azimuthDeg: number, duration: number): void {
  actor.drive.kinematic.autoUpdate$.next(true);
  actor.drive.kinematic.setLinearSpeed(metersPerSecond(speedMPS));
  actor.drive.kinematic.setLinearAzimuthDeg(degrees(azimuthDeg));
  // TODO setTimout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
  setInterval((): void => {
    actor.drive.kinematic.setLinearAzimuthDeg(degrees(actor.drive.kinematic.getLinearAzimuthDeg() + 180));
  }, duration);
}
