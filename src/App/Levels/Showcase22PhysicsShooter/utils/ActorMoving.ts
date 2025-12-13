import { distinctUntilChanged, map } from 'rxjs';
import type { Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

import type { TActorWrapperAsync, TIntersectionEvent, TIntersectionsWatcher, TKeyboardService, TRadians } from '@/Engine';
import { getAzimuthRadFromDirection, getElevationRadFromDirection, KeyCode } from '@/Engine';

type TMoveKeysState = Readonly<{ Forward: boolean; Left: boolean; Right: boolean; Backward: boolean }>;
type TActorMovingParams = Readonly<{ speed: number; azimuthAngleDeviationRad: TRadians; toSideAzimuthRad: TRadians; toBackwardAzimuthRad: TRadians }>;
type TActorMoveState = Readonly<{ currentSpeed: number; azimuthDeviationLeftRad: TRadians; azimuthDeviationRightRad: TRadians; azimuthDeviationBackwardRad: TRadians }>;

export function startMoveActorWithKeyboard(actorW: TActorWrapperAsync, keyboardService: TKeyboardService, mouseLineIntersectionsWatcher: TIntersectionsWatcher): void {
  let keyStates: TMoveKeysState = { Forward: false, Left: false, Right: false, Backward: false };
  let baseAzimuthRad: TRadians = 0;

  const actorMovingParams: TActorMovingParams = {
    speed: 5,
    azimuthAngleDeviationRad: degToRad(45),
    toSideAzimuthRad: degToRad(90),
    toBackwardAzimuthRad: degToRad(180)
  };

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
    const state: TActorMoveState = getActorMoveState(keyStates, actorMovingParams);
    actorW.kinematic.setLinearSpeed(state.currentSpeed);
    actorW.kinematic.setLinearAzimuthRad(baseAzimuthRad + state.azimuthDeviationLeftRad + state.azimuthDeviationRightRad + state.azimuthDeviationBackwardRad);
    // console.log(state);
  }, 40);
}

function getMouseAzimuthAndElevation(mousePosition: Vector3, playerPosition: Vector3): Readonly<{ azimuth: TRadians; elevation: TRadians }> {
  const direction: Vector3 = mousePosition.clone().sub(playerPosition).normalize();
  const azimuth: number = getAzimuthRadFromDirection(direction);
  const elevation: number = getElevationRadFromDirection(direction);

  return { azimuth, elevation };
}

function getActorMoveState(keyStates: TMoveKeysState, { speed, azimuthAngleDeviationRad, toSideAzimuthRad, toBackwardAzimuthRad }: TActorMovingParams): TActorMoveState {
  let currentSpeed: number = 0;
  let azimuthDeviationLeftRad: TRadians = 0;
  let azimuthDeviationRightRad: TRadians = 0;
  let azimuthDeviationBackwardRad: TRadians = 0;

  //moving any direction but not forward and backward at the same time
  if ((keyStates.Forward || keyStates.Left || keyStates.Right || keyStates.Backward) && !(keyStates.Forward && keyStates.Backward)) currentSpeed = speed;
  //moving forward and left or backward and left
  if ((keyStates.Forward && keyStates.Left) || (keyStates.Backward && keyStates.Left)) azimuthDeviationLeftRad = -azimuthAngleDeviationRad;
  //moving forward and right or backward and right
  if ((keyStates.Forward && keyStates.Right) || (keyStates.Backward && keyStates.Right)) azimuthDeviationRightRad = azimuthAngleDeviationRad;
  //moving just left (not forward/backward + left)
  if ((!keyStates.Forward && keyStates.Left) || (!keyStates.Backward && keyStates.Left)) azimuthDeviationLeftRad = -toSideAzimuthRad;
  //moving just right (not forward/backward + right)
  if ((!keyStates.Forward && keyStates.Right) || (!keyStates.Backward && keyStates.Right)) azimuthDeviationRightRad = toSideAzimuthRad;
  //moving just backward (not backward + left/right)
  if (((keyStates.Backward && !keyStates.Left) || (keyStates.Backward && !keyStates.Right)) && !keyStates.Forward) azimuthDeviationBackwardRad = toBackwardAzimuthRad;
  //trying to move forward and backward at the same time
  if (keyStates.Forward && keyStates.Backward) {
    currentSpeed = 0;
    azimuthDeviationBackwardRad = 0;
  }

  console.log(`${keyStates.Forward ? 'Forward' : ''} ${keyStates.Left ? 'Left' : ''} ${keyStates.Right ? 'Right' : ''} ${keyStates.Backward ? 'Backward' : ''}`);

  return { currentSpeed, azimuthDeviationLeftRad, azimuthDeviationRightRad, azimuthDeviationBackwardRad };
}
