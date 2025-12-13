import type {
  TActor,
  TActorService,
  TIntersectionEvent,
  TIntersectionsCameraWatcher,
  TIntersectionsWatcherService,
  TKeyboardPressingEvent,
  TKeyboardService,
  TMouseService,
  TMouseWatcherEvent
} from '@Anarchy/Engine';
import { KeyCode, LookUpStrategy, metersPerSecond, mpsSpeed } from '@Anarchy/Engine';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import { withLatestFrom } from 'rxjs';
import { Vector3 } from 'three';

export function initInputActors(actorService: TActorService, keyboardService: TKeyboardService, mouseService: TMouseService, intersectionsWatcherService: TIntersectionsWatcherService): void {
  const { getByName, getByTags } = actorService.getRegistry();
  const { onKey } = keyboardService;

  const actorKeyboard: TActor = getByName('sphere_keyboard_actor');
  const actorMouse: TActor = getByName('sphere_mouse_actor');
  const actorKeyW: TActor = getByTags(['key', 'W'], LookUpStrategy.Every);
  const actorKeyA: TActor = getByTags(['key', 'A'], LookUpStrategy.Every);
  const actorKeyS: TActor = getByTags(['key', 'S'], LookUpStrategy.Every);
  const actorKeyD: TActor = getByTags(['key', 'D'], LookUpStrategy.Every);
  const actorMkeyLeft: TActor = getByTags(['mkey', 'Left'], LookUpStrategy.Every);
  const actorMkeyRight: TActor = getByTags(['mkey', 'Right'], LookUpStrategy.Every);
  const actorMkeyMiddle: TActor = getByTags(['mkey', 'Middle'], LookUpStrategy.Every);

  onKey(KeyCode.W).pressing$.subscribe(({ delta }: TKeyboardPressingEvent): void => void actorKeyboard.drive.default.addZ(mpsSpeed(metersPerSecond(-10), delta)));
  onKey(KeyCode.W).pressed$.subscribe((): void => void actorKeyW.drive.default.addY(-0.2));
  onKey(KeyCode.W).released$.subscribe((): void => void actorKeyW.drive.default.addY(0.2));

  onKey(KeyCode.A).pressing$.subscribe(({ delta }: TKeyboardPressingEvent): void => void actorKeyboard.drive.default.addX(mpsSpeed(metersPerSecond(-10), delta)));
  onKey(KeyCode.A).pressed$.subscribe((): void => void actorKeyA.drive.default.addY(-0.2));
  onKey(KeyCode.A).released$.subscribe((): void => void actorKeyA.drive.default.addY(0.2));

  onKey(KeyCode.S).pressing$.subscribe(({ delta }: TKeyboardPressingEvent): void => void actorKeyboard.drive.default.addZ(mpsSpeed(metersPerSecond(10), delta)));
  onKey(KeyCode.S).pressed$.subscribe((): void => void actorKeyS.drive.default.addY(-0.2));
  onKey(KeyCode.S).released$.subscribe((): void => void actorKeyS.drive.default.addY(0.2));

  onKey(KeyCode.D).pressing$.subscribe(({ delta }: TKeyboardPressingEvent): void => void actorKeyboard.drive.default.addX(mpsSpeed(metersPerSecond(10), delta)));
  onKey(KeyCode.D).pressed$.subscribe((): void => void actorKeyD.drive.default.addY(-0.2));
  onKey(KeyCode.D).released$.subscribe((): void => void actorKeyD.drive.default.addY(0.2));

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
