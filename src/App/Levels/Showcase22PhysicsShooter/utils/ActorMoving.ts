import { BehaviorSubject, combineLatest, map, Subject } from 'rxjs';
import { degToRad } from 'three/src/math/MathUtils';

import type { TActor, TIntersectionEvent, TIntersectionsWatcher, TKeyboardService, TMetersPerSecond, TMilliseconds, TRadians } from '@/Engine';
import { getMouseAzimuthAndElevation, KeyCode, metersPerSecond } from '@/Engine';
import { radians } from '@/Engine/Measurements/Utils';

type TMoveKeysState = { Forward: boolean; Left: boolean; Right: boolean; Backward: boolean };
type TIntersectionDirection = Readonly<{ azimuth: TRadians; elevation: TRadians }>;

export function startMoveActorWithKeyboard(actor: TActor, keyboardService: TKeyboardService, mouseLineIntersectionsWatcher: TIntersectionsWatcher): void {
  const keyStates$: BehaviorSubject<TMoveKeysState> = new BehaviorSubject<TMoveKeysState>({ Forward: false, Left: false, Right: false, Backward: false });
  const intersectionDirection$: Subject<TIntersectionDirection> = new Subject<TIntersectionDirection>();

  const { onKey } = keyboardService;

  onKey(KeyCode.W).pressed$.subscribe((): void => keyStates$.next({ ...keyStates$.value, Forward: true }));
  onKey(KeyCode.A).pressed$.subscribe((): void => keyStates$.next({ ...keyStates$.value, Left: true }));
  onKey(KeyCode.S).pressed$.subscribe((): void => keyStates$.next({ ...keyStates$.value, Backward: true }));
  onKey(KeyCode.D).pressed$.subscribe((): void => keyStates$.next({ ...keyStates$.value, Right: true }));

  onKey(KeyCode.W).released$.subscribe((): void => keyStates$.next({ ...keyStates$.value, Forward: false }));
  onKey(KeyCode.A).released$.subscribe((): void => keyStates$.next({ ...keyStates$.value, Left: false }));
  onKey(KeyCode.S).released$.subscribe((): void => keyStates$.next({ ...keyStates$.value, Backward: false }));
  onKey(KeyCode.D).released$.subscribe((): void => keyStates$.next({ ...keyStates$.value, Right: false }));

  mouseLineIntersectionsWatcher.value$
    .pipe(map((intersection: TIntersectionEvent) => getMouseAzimuthAndElevation(intersection.point, actor.drive.position$.value)))
    .subscribe((dir: TIntersectionDirection) => intersectionDirection$.next(dir));

  combineLatest([keyStates$, intersectionDirection$]).subscribe(([keyStates, { azimuth }]: [TMoveKeysState, TIntersectionDirection]): void => {
    actor.drive.kinematic.setLinearSpeed(getActorMoveSpeed(keyStates, 5, 4, 3));
    actor.drive.kinematic.setLinearAzimuth(radians(azimuth + getActorMoveAzimuthRad(keyStates)));
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

export function moveActorBounce(actor: TActor, speed: TMetersPerSecond, azimuth: TRadians, duration: TMilliseconds): void {
  actor.drive.kinematic.autoUpdate$.next(true);
  actor.drive.kinematic.setLinearSpeed(speed);
  actor.drive.kinematic.setLinearAzimuth(azimuth);
  // TODO setTimout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
  setInterval((): void => {
    actor.drive.kinematic.setLinearAzimuth(radians(actor.drive.kinematic.getLinearAzimuth() + degToRad(180)));
  }, duration);
}
