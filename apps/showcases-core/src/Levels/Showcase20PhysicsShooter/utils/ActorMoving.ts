import type { TActor, TIntersectionEvent, TIntersectionsCameraWatcher, TKeyboardService, TMetersPerSecond, TMilliseconds, TRadians } from '@Anarchy/Engine';
import { getMouseAzimuthAndElevation, isKeyInEvent, isKeyPressed, KeyCode, metersPerSecond } from '@Anarchy/Engine';
import { radians } from '@Anarchy/Engine/Measurements/Utils';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import { BehaviorSubject, combineLatest, map, Subject } from 'rxjs';
import { degToRad } from 'three/src/math/MathUtils';

type TMoveKeysState = { Forward: boolean; Left: boolean; Right: boolean; Backward: boolean };
type TIntersectionDirection = Readonly<{ azimuth: TRadians; elevation: TRadians }>;

export function startMoveActorWithKeyboard(actor: TActor, keyboardService: TKeyboardService, mouseLineIntersectionsWatcher: TIntersectionsCameraWatcher): void {
  const keyStates$: BehaviorSubject<TMoveKeysState> = new BehaviorSubject<TMoveKeysState>({ Forward: false, Left: false, Right: false, Backward: false });
  const intersectionDirection$: Subject<TIntersectionDirection> = new Subject<TIntersectionDirection>();

  const { keys$ } = keyboardService;

  keys$.subscribe(({ keys, event }): void => {
    if (isKeyInEvent(KeyCode.W, event)) keyStates$.next({ ...keyStates$.value, Forward: isKeyPressed(KeyCode.W, keys) });
    if (isKeyInEvent(KeyCode.A, event)) keyStates$.next({ ...keyStates$.value, Left: isKeyPressed(KeyCode.A, keys) });
    if (isKeyInEvent(KeyCode.S, event)) keyStates$.next({ ...keyStates$.value, Backward: isKeyPressed(KeyCode.S, keys) });
    if (isKeyInEvent(KeyCode.D, event)) keyStates$.next({ ...keyStates$.value, Right: isKeyPressed(KeyCode.D, keys) });
  });

  mouseLineIntersectionsWatcher.value$
    .pipe(
      map((intersection: TIntersectionEvent) => {
        if (isNotDefined(intersection)) throw new Error('Intersection not defined');
        return getMouseAzimuthAndElevation(intersection.point, actor.drive.position$.value);
      })
    )
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
  // TODO setTimeout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
  setInterval((): void => {
    actor.drive.kinematic.setLinearAzimuth(radians(actor.drive.kinematic.getLinearAzimuth() + degToRad(180)));
  }, duration);
}
