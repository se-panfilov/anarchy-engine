import type {
  TActor,
  TActorService,
  TIntersectionEvent,
  TIntersectionsCameraWatcher,
  TIntersectionsWatcherService,
  TKeyboardService,
  TKeysPressingEvent,
  TMouseService,
  TMouseWatcherEvent
} from '@Anarchy/Engine';
import { KeyCode, LookUpStrategy, metersPerSecond, mpsSpeed } from '@Anarchy/Engine';
import { isEventKey, isKeyPressed } from '@Anarchy/Engine/Keyboard/Utils/KeysUtils';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import { withLatestFrom } from 'rxjs';
import { Vector3 } from 'three';

export function initInputActors(actorService: TActorService, keyboardService: TKeyboardService, mouseService: TMouseService, intersectionsWatcherService: TIntersectionsWatcherService): void {
  const { getByName, getByTags } = actorService.getRegistry();
  const { combo$, pressing$, pressed$, released$ } = keyboardService;

  const actorKeyboard: TActor = getByName('sphere_keyboard_actor');
  const actorMouse: TActor = getByName('sphere_mouse_actor');
  const actorKeyW: TActor = getByTags(['key', 'W'], LookUpStrategy.Every);
  const actorKeyA: TActor = getByTags(['key', 'A'], LookUpStrategy.Every);
  const actorKeyS: TActor = getByTags(['key', 'S'], LookUpStrategy.Every);
  const actorKeyD: TActor = getByTags(['key', 'D'], LookUpStrategy.Every);
  const actorMkeyLeft: TActor = getByTags(['mkey', 'Left'], LookUpStrategy.Every);
  const actorMkeyRight: TActor = getByTags(['mkey', 'Right'], LookUpStrategy.Every);
  const actorMkeyMiddle: TActor = getByTags(['mkey', 'Middle'], LookUpStrategy.Every);

  const actionKeys = {
    GoDown: KeyCode.S,
    GoLeft: KeyCode.A,
    GoRight: KeyCode.D,
    GoUp: KeyCode.W
  };

  const { GoDown, GoLeft, GoRight, GoUp } = actionKeys;

  combo$.subscribe((v) => {
    console.log('XXX1', v);
  });

  pressed$.subscribe((event: KeyboardEvent): void => {
    if (isEventKey(GoUp, event)) void actorKeyW.drive.default.addY(-0.2);
    if (isEventKey(GoLeft, event)) void actorKeyA.drive.default.addY(-0.2);
    if (isEventKey(GoDown, event)) void actorKeyS.drive.default.addY(-0.2);
    if (isEventKey(GoRight, event)) void actorKeyD.drive.default.addY(-0.2);
  });

  released$.subscribe((event: KeyboardEvent): void => {
    if (isEventKey(GoUp, event)) void actorKeyW.drive.default.addY(0.2);
    if (isEventKey(GoLeft, event)) void actorKeyA.drive.default.addY(0.2);
    if (isEventKey(GoDown, event)) void actorKeyS.drive.default.addY(0.2);
    if (isEventKey(GoRight, event)) void actorKeyD.drive.default.addY(0.2);
  });

  pressing$.subscribe(({ keys, delta }: TKeysPressingEvent): void => {
    if (isKeyPressed(GoUp, keys)) actorKeyboard.drive.default.addZ(mpsSpeed(metersPerSecond(-10), delta));
    if (isKeyPressed(GoLeft, keys)) actorKeyboard.drive.default.addX(mpsSpeed(metersPerSecond(-10), delta));
    if (isKeyPressed(GoDown, keys)) actorKeyboard.drive.default.addZ(mpsSpeed(metersPerSecond(10), delta));
    if (isKeyPressed(GoRight, keys)) actorKeyboard.drive.default.addX(mpsSpeed(metersPerSecond(10), delta));
  });

  const watcherSurface: TIntersectionsCameraWatcher = intersectionsWatcherService.getCameraWatcher('watcher_surface');

  const { clickLeftRelease$, isLeftPressed$, isRightPressed$, isMiddlePressed$, doubleLeftClick$, doubleRightClick$, wheelUp$, wheelDown$ } = mouseService;

  clickLeftRelease$.pipe(withLatestFrom(watcherSurface.value$)).subscribe(([, intersection]: [TMouseWatcherEvent, TIntersectionEvent]): void => {
    if (isNotDefined(intersection)) throw new Error('Intersection not defined');
    const position: Vector3 = intersection.point.clone().add(new Vector3(0, 1.5, 0));
    actorMouse.drive.kinematic.moveTo(position, metersPerSecond(15));
  });

  isLeftPressed$.subscribe((isPressed: boolean): void => void actorMkeyLeft.drive.default.addY(isPressed ? -0.2 : 0.2));
  isRightPressed$.subscribe((isPressed: boolean): void => void actorMkeyRight.drive.default.addY(isPressed ? -0.2 : 0.2));
  isMiddlePressed$.subscribe((isPressed: boolean): void => void actorMkeyMiddle.drive.default.addY(isPressed ? -0.2 : 0.2));

  doubleLeftClick$.subscribe((event: TMouseWatcherEvent): void => console.log('double click left', event));
  doubleRightClick$.subscribe((event: TMouseWatcherEvent): void => console.log('double click right', event));

  wheelUp$.subscribe((): void => actorMkeyMiddle.drive.default.adjustRotationByX(5));
  wheelDown$.subscribe((): void => actorMkeyMiddle.drive.default.adjustRotationByX(-5));
}
