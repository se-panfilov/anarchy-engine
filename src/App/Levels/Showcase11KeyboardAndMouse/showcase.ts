import GUI from 'lil-gui';
import { withLatestFrom } from 'rxjs';
import { Vector3 } from 'three';

import { createReactiveLineFromActor } from '@/App/Levels/Showcase25TransformDrive/Utils';
import { addGizmo } from '@/App/Levels/Utils';
import type { TActor, TActorRegistry, TAnyCameraWrapper, TIntersectionEvent, TIntersectionsWatcher, TKeyboardPressingEvent, TMouseWatcherEvent, TMoverService, TSpace, TSpaceConfig } from '@/Engine';
import { asRecord, defaultMoverServiceConfig, Easing, isNotDefined, KeyCode, LookUpStrategy, metersPerSecond, mpsSpeed, spaceService, TransformAgent } from '@/Engine';
import { MoverService } from '@/Engine/Services/MoverService/MoverService';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig]));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const gui: GUI = new GUI();

  const { keyboardService } = space.services;

  const { actorService, cameraService, intersectionsWatcherService, mouseService, scenesService } = space.services;
  const { transformLoop, intersectionsLoop } = space.loops;
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const { getByName, getByTags } = actorRegistry;
  const { onKey } = keyboardService;

  const camera: TAnyCameraWrapper | undefined = cameraService.findActive();
  if (isNotDefined(camera)) throw new Error('Camera is not defined');

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  const actorKeyboard: TActor = getByName('sphere_keyboard_actor');
  const actorMouse: TActor = getByName('sphere_mouse_actor');
  const actorKeyW: TActor = getByTags(['key', 'W'], LookUpStrategy.Every);
  const actorKeyA: TActor = getByTags(['key', 'A'], LookUpStrategy.Every);
  const actorKeyS: TActor = getByTags(['key', 'S'], LookUpStrategy.Every);
  const actorKeyD: TActor = getByTags(['key', 'D'], LookUpStrategy.Every);
  const actorMkeyLeft: TActor = getByTags(['mkey', 'Left'], LookUpStrategy.Every);
  const actorMkeyRight: TActor = getByTags(['mkey', 'Right'], LookUpStrategy.Every);
  const actorMkeyMiddle: TActor = getByTags(['mkey', 'Middle'], LookUpStrategy.Every);
  const actorMkeyBack: TActor = getByTags(['mkey', 'Back'], LookUpStrategy.Every);
  const actorMkeyForward: TActor = getByTags(['mkey', 'Forward'], LookUpStrategy.Every);
  const actorMkeyExtra: TActor = getByTags(['mkey', 'Extra'], LookUpStrategy.Every);

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

  const intersectionsWatcher: TIntersectionsWatcher = startIntersections(camera);
  const coordsUI: { x: number; z: number } = { x: 0, z: 0 };

  const { line } = createReactiveLineFromActor('#E91E63', actorMouse, intersectionsWatcher);
  scenesService.findActive()?.entity.add(line);

  gui.add(coordsUI, 'x').listen();
  gui.add(coordsUI, 'z').listen();

  intersectionsWatcher.value$.subscribe((intersection: TIntersectionEvent): void => {
    // eslint-disable-next-line functional/immutable-data
    coordsUI.x = intersection.point.x;
    // eslint-disable-next-line functional/immutable-data
    coordsUI.z = intersection.point.z;
  });

  const { clickLeftRelease$, isLeftPressed$, isRightPressed$, isMiddlePressed$, isBackPressed$, isForwardPressed$, isExtraPressed$, doubleLeftClick$, doubleRightClick$, wheelUp$, wheelDown$ } =
    mouseService;

  const moverService: TMoverService = MoverService(transformLoop, defaultMoverServiceConfig);

  const folder: GUI = gui.addFolder('Mouse Actor');
  const mode = { isKinematicMouseActor: false };
  folder.add(mode, 'isKinematicMouseActor').name('Mouse actor is in kinematic mode');

  clickLeftRelease$.pipe(withLatestFrom(intersectionsWatcher.value$)).subscribe(([, intersection]: [TMouseWatcherEvent, TIntersectionEvent]): void => {
    if (!mode.isKinematicMouseActor) {
      if (actorMouse.drive.getActiveAgent().type !== TransformAgent.Connected) actorMouse.drive.agent$.next(TransformAgent.Connected);
      void moverService.goToPosition(
        actorMouse,
        { x: intersection.point.x, z: intersection.point.z },
        {
          duration: 1000,
          easing: Easing.EaseInCubic
        }
      );
    } else {
      if (actorMouse.drive.getActiveAgent().type !== TransformAgent.Kinematic) actorMouse.drive.agent$.next(TransformAgent.Kinematic);
      const position: Vector3 = intersection.point.clone().add(new Vector3(0, 1.5, 0));
      actorMouse.drive.kinematic.moveTo(position, metersPerSecond(15));
    }
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

  function startIntersections(camera: TAnyCameraWrapper): TIntersectionsWatcher {
    const actor: TActor = getByName('surface_actor');

    return intersectionsWatcherService.create({
      name: 'intersection_watcher',
      actors: [actor],
      camera,
      isAutoStart: true,
      position$: mouseService.normalizedPosition$,
      intersectionsLoop
    });
  }

  space.start$.next(true);
}
