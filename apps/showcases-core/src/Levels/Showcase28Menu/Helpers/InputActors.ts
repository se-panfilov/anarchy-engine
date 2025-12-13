import type {
  TActor,
  TActorService,
  TIntersectionEvent,
  TIntersectionsCameraWatcher,
  TIntersectionsWatcherService,
  TKeyboardService,
  TKinematicLoop,
  TMouseService,
  TMouseWatcherEvent
} from '@Anarchy/Engine';
import { isPressEvent, KeyCode, LookUpStrategy, metersPerSecond, mpsSpeed } from '@Anarchy/Engine';
import type { TKeyEvent } from '@Anarchy/Engine/Keyboard/Models';
import { hasKey, isKeyInEvent } from '@Anarchy/Engine/Keyboard/Utils';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import { withLatestFrom } from 'rxjs';
import { Vector3 } from 'three';

const actionKeys = {
  GoDown: KeyCode.S,
  GoLeft: KeyCode.A,
  GoRight: KeyCode.D,
  GoUp: KeyCode.W
};

const { Every } = LookUpStrategy;
const { GoDown, GoLeft, GoRight, GoUp } = actionKeys;

export function initInputActors(
  actorService: TActorService,
  keyboardService: TKeyboardService,
  mouseService: TMouseService,
  intersectionsWatcherService: TIntersectionsWatcherService,
  kinematicLoop: TKinematicLoop
): void {
  const { getByName, getByTags } = actorService.getRegistry();
  const { keys$ } = keyboardService;

  const actorKeyboard: TActor = getByName('sphere_keyboard_actor');
  const actorMouse: TActor = getByName('sphere_mouse_actor');
  const actorKeyW: TActor = getByTags(['key', 'W'], Every);
  const actorKeyA: TActor = getByTags(['key', 'A'], Every);
  const actorKeyS: TActor = getByTags(['key', 'S'], Every);
  const actorKeyD: TActor = getByTags(['key', 'D'], Every);
  const actorMkeyLeft: TActor = getByTags(['mkey', 'Left'], Every);
  const actorMkeyRight: TActor = getByTags(['mkey', 'Right'], Every);
  const actorMkeyMiddle: TActor = getByTags(['mkey', 'Middle'], Every);

  keys$.subscribe((event: TKeyEvent): void => {
    //true/false switches
    if (isKeyInEvent(GoUp, event)) void actorKeyW.drive.default.addY(isPressEvent(event) ? -0.2 : 0.2);
    if (isKeyInEvent(GoLeft, event)) void actorKeyA.drive.default.addY(isPressEvent(event) ? -0.2 : 0.2);
    if (isKeyInEvent(GoDown, event)) void actorKeyS.drive.default.addY(isPressEvent(event) ? -0.2 : 0.2);
    if (isKeyInEvent(GoRight, event)) void actorKeyD.drive.default.addY(isPressEvent(event) ? -0.2 : 0.2);
  });

  kinematicLoop.tick$.pipe(withLatestFrom(keys$)).subscribe(([delta, { keys }]) => {
    //continues movement while key is pressed
    if (hasKey(GoUp, keys)) actorKeyboard.drive.default.addZ(mpsSpeed(metersPerSecond(-10), delta));
    if (hasKey(GoLeft, keys)) actorKeyboard.drive.default.addX(mpsSpeed(metersPerSecond(-10), delta));
    if (hasKey(GoDown, keys)) actorKeyboard.drive.default.addZ(mpsSpeed(metersPerSecond(10), delta));
    if (hasKey(GoRight, keys)) actorKeyboard.drive.default.addX(mpsSpeed(metersPerSecond(10), delta));
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
