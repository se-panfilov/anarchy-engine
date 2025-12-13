import GUI from 'lil-gui';
import { withLatestFrom } from 'rxjs';
import { Vector3 } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import { createReactiveLineFromActor } from '@/App/Levels/Showcase25TransformDrive/Utils';
import { addGizmo } from '@/App/Levels/Utils';
import type { TActor, TActorRegistry, TCameraWrapper, TEngine, TIntersectionEvent, TIntersectionsWatcher, TMouseWatcherEvent, TMoverService, TSpace, TSpaceConfig } from '@/Engine';
import { ambientContext, defaultMoverServiceConfig, Easing, Engine, isNotDefined, KeyCode, LookUpStrategy, metersPerSecond, mpsSpeed, spaceService, TransformAgent } from '@/Engine';
import { MoverService } from '@/Engine/Services/MoverService/MoverService';

import spaceConfigJson from './showcase.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function showcase(): TShowcase {
  const gui: GUI = new GUI();
  const spaces: ReadonlyArray<TSpace> = spaceService.createFromConfig([spaceConfig]);
  // TODO 14-0-0: implement spaceService.findActive()
  const space: TSpace = spaces[0];
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;

  const { actorService, cameraService, intersectionsWatcherService, mouseService, scenesService } = space.services;
  const { transformLoop, intersectionsLoop } = space.loops;
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const { findByName, findByTags } = actorRegistry;
  const { onKey } = keyboardService;

  function init(): void {
    const camera: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(camera)) throw new Error('Camera is not defined');

    addGizmo(space.services, ambientContext.screenSizeWatcher, space.loops, { placement: 'bottom-left' });

    const actorKeyboard: TActor | undefined = findByName('sphere_keyboard_actor');
    const actorMouse: TActor | undefined = findByName('sphere_mouse_actor');
    const actorKeyW: TActor | undefined = findByTags(['key', 'W'], LookUpStrategy.Every);
    const actorKeyA: TActor | undefined = findByTags(['key', 'A'], LookUpStrategy.Every);
    const actorKeyS: TActor | undefined = findByTags(['key', 'S'], LookUpStrategy.Every);
    const actorKeyD: TActor | undefined = findByTags(['key', 'D'], LookUpStrategy.Every);
    const actorMkeyLeft: TActor | undefined = findByTags(['mkey', 'Left'], LookUpStrategy.Every);
    const actorMkeyRight: TActor | undefined = findByTags(['mkey', 'Right'], LookUpStrategy.Every);
    const actorMkeyMiddle: TActor | undefined = findByTags(['mkey', 'Middle'], LookUpStrategy.Every);
    const actorMkeyBack: TActor | undefined = findByTags(['mkey', 'Back'], LookUpStrategy.Every);
    const actorMkeyForward: TActor | undefined = findByTags(['mkey', 'Forward'], LookUpStrategy.Every);
    const actorMkeyExtra: TActor | undefined = findByTags(['mkey', 'Extra'], LookUpStrategy.Every);

    if (isNotDefined(actorKeyboard)) throw new Error('Actor keyboard is not defined');
    if (isNotDefined(actorMouse)) throw new Error('Actor mouse is not defined');
    if (isNotDefined(actorKeyW)) throw new Error('Actor key W is not defined');
    if (isNotDefined(actorKeyA)) throw new Error('Actor key A is not defined');
    if (isNotDefined(actorKeyS)) throw new Error('Actor key S is not defined');
    if (isNotDefined(actorKeyD)) throw new Error('Actor key D is not defined');
    if (isNotDefined(actorMkeyLeft)) throw new Error('Actor mkey Left is not defined');
    if (isNotDefined(actorMkeyRight)) throw new Error('Actor mkey Right is not defined');
    if (isNotDefined(actorMkeyMiddle)) throw new Error('Actor mkey Middle is not defined');
    if (isNotDefined(actorMkeyBack)) throw new Error('Actor mkey Back is not defined');
    if (isNotDefined(actorMkeyForward)) throw new Error('Actor mkey Forward is not defined');
    if (isNotDefined(actorMkeyExtra)) throw new Error('Actor mkey Extra is not defined');

    onKey(KeyCode.W).pressing$.subscribe(({ delta }): void => void actorKeyboard.drive.default.addZ(mpsSpeed(metersPerSecond(-10), delta)));
    onKey(KeyCode.W).pressed$.subscribe((): void => void actorKeyW.drive.default.addY(-0.2));
    onKey(KeyCode.W).released$.subscribe((): void => void actorKeyW.drive.default.addY(0.2));

    onKey(KeyCode.A).pressing$.subscribe(({ delta }): void => void actorKeyboard.drive.default.addX(mpsSpeed(metersPerSecond(-10), delta)));
    onKey(KeyCode.A).pressed$.subscribe((): void => void actorKeyA.drive.default.addY(-0.2));
    onKey(KeyCode.A).released$.subscribe((): void => void actorKeyA.drive.default.addY(0.2));

    onKey(KeyCode.S).pressing$.subscribe(({ delta }): void => void actorKeyboard.drive.default.addZ(mpsSpeed(metersPerSecond(10), delta)));
    onKey(KeyCode.S).pressed$.subscribe((): void => void actorKeyS.drive.default.addY(-0.2));
    onKey(KeyCode.S).released$.subscribe((): void => void actorKeyS.drive.default.addY(0.2));

    onKey(KeyCode.D).pressing$.subscribe(({ delta }): void => void actorKeyboard.drive.default.addX(mpsSpeed(metersPerSecond(10), delta)));
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
        void moverService.goToPosition(actorMouse, { x: intersection.point.x, z: intersection.point.z }, { duration: 1000, easing: Easing.EaseInCubic });
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
  }

  function startIntersections(camera: TCameraWrapper): TIntersectionsWatcher {
    const actor: TActor | undefined = findByName('surface_actor');
    if (isNotDefined(actor)) throw new Error('Actor is not defined');

    return intersectionsWatcherService.create({ actors: [actor], camera, isAutoStart: true, position$: mouseService.position$, intersectionsLoop });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
