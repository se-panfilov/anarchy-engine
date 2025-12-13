import type { TActor, TActorRegistry, TAnyCameraWrapper, TIntersectionEvent, TIntersectionsCameraWatcher, TKeyEvent, TMouseWatcherEvent, TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { hasKey, isKeyInEvent, isPressEvent, KeyCode, LookUpStrategy, metersPerSecond, mpsSpeed, spaceService } from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import GUI from 'lil-gui';
import { withLatestFrom } from 'rxjs';
import { Vector3 } from 'three';

import { createReactiveLineFromActor } from '@/Levels/Showcase23TransformDrive/Utils';
import type { TAppSettings } from '@/Models';
import { addGizmo, enableFPSCounter } from '@/Utils';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

const actionKeys = {
  GoDown: KeyCode.S,
  GoLeft: KeyCode.A,
  GoRight: KeyCode.D,
  GoUp: KeyCode.W
};

const { Every } = LookUpStrategy;
const { GoDown, GoLeft, GoRight, GoUp } = actionKeys;

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);
  if (settings.loopsDebugInfo) enableFPSCounter(space.loops.renderLoop.tick$);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const gui: GUI = new GUI();

  const { keyboardService } = space.services;

  const { actorService, cameraService, intersectionsWatcherService, mouseService, scenesService } = space.services;
  const { intersectionsLoop, kinematicLoop } = space.loops;
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const { getByName, getByTags } = actorRegistry;
  const { keys$ } = keyboardService;

  const camera: TAnyCameraWrapper = cameraService.getActive();

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  const actorKeyboard: TActor = getByName('sphere_keyboard_actor');
  const actorMouse: TActor = getByName('sphere_mouse_actor');
  const actorKeyW: TActor = getByTags(['key', 'W'], Every);
  const actorKeyA: TActor = getByTags(['key', 'A'], Every);
  const actorKeyS: TActor = getByTags(['key', 'S'], Every);
  const actorKeyD: TActor = getByTags(['key', 'D'], Every);
  const actorMkeyLeft: TActor = getByTags(['mkey', 'Left'], Every);
  const actorMkeyRight: TActor = getByTags(['mkey', 'Right'], Every);
  const actorMkeyMiddle: TActor = getByTags(['mkey', 'Middle'], Every);
  const actorMkeyBack: TActor = getByTags(['mkey', 'Back'], Every);
  const actorMkeyForward: TActor = getByTags(['mkey', 'Forward'], Every);
  const actorMkeyExtra: TActor = getByTags(['mkey', 'Extra'], Every);

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

  const intersectionsWatcher: TIntersectionsCameraWatcher = startIntersections(camera);
  const coordsUI: { x: number; z: number } = { x: 0, z: 0 };

  const { line } = createReactiveLineFromActor('#E91E63', actorMouse, intersectionsWatcher);
  scenesService.getActive().entity.add(line);

  gui.add(coordsUI, 'x').listen();
  gui.add(coordsUI, 'z').listen();

  intersectionsWatcher.value$.subscribe((intersection: TIntersectionEvent): void => {
    if (isNotDefined(intersection)) return;
    // eslint-disable-next-line functional/immutable-data
    coordsUI.x = intersection.point.x;
    // eslint-disable-next-line functional/immutable-data
    coordsUI.z = intersection.point.z;
  });

  const { clickLeftRelease$, isLeftPressed$, isRightPressed$, isMiddlePressed$, isBackPressed$, isForwardPressed$, isExtraPressed$, doubleLeftClick$, doubleRightClick$, wheelUp$, wheelDown$ } =
    mouseService;

  clickLeftRelease$.pipe(withLatestFrom(intersectionsWatcher.value$)).subscribe(([, intersection]: [TMouseWatcherEvent, TIntersectionEvent]): void => {
    if (isNotDefined(intersection)) throw new Error('Intersection not defined');
    const position: Vector3 = intersection.point.clone().add(new Vector3(0, 1.5, 0));
    actorMouse.drive.kinematic.moveTo(position, metersPerSecond(15));
  });

  isLeftPressed$.subscribe((isPressed: boolean): void => void actorMkeyLeft.drive.default.addY(isPressed ? -0.2 : 0.2));
  isRightPressed$.subscribe((isPressed: boolean): void => void actorMkeyRight.drive.default.addY(isPressed ? -0.2 : 0.2));
  isMiddlePressed$.subscribe((isPressed: boolean): void => void actorMkeyMiddle.drive.default.addY(isPressed ? -0.2 : 0.2));
  isBackPressed$.subscribe((isPressed: boolean): void => void actorMkeyBack.drive.default.addY(isPressed ? -0.2 : 0.2));
  isForwardPressed$.subscribe((isPressed: boolean): void => void actorMkeyForward.drive.default.addY(isPressed ? -0.2 : 0.2));
  isExtraPressed$.subscribe((isPressed: boolean): void => void actorMkeyExtra.drive.default.addY(isPressed ? -0.2 : 0.2));

  doubleLeftClick$.subscribe((event: TMouseWatcherEvent): void => console.log('double click left', event));
  doubleRightClick$.subscribe((event: TMouseWatcherEvent): void => console.log('double click right', event));

  wheelUp$.subscribe((): void => actorMkeyMiddle.drive.default.adjustRotationByX(10));
  wheelDown$.subscribe((): void => actorMkeyMiddle.drive.default.adjustRotationByX(-10));

  function startIntersections(camera: TAnyCameraWrapper): TIntersectionsCameraWatcher {
    const actor: TActor = getByName('surface_actor');

    return intersectionsWatcherService.create({
      name: 'intersection_watcher',
      actors: [actor],
      camera,
      isAutoStart: true,
      position$: mouseService.normalizedPosition$,
      intersectionsLoop
    }) as TIntersectionsCameraWatcher;
  }

  space.start$.next(true);
}
