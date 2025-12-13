import GUI from 'lil-gui';
import { withLatestFrom } from 'rxjs';

import type { TShowcase } from '@/App/Levels/Models';
import type {
  TActorRegistry,
  TActorWrapper,
  TAppCanvas,
  TCameraWrapper,
  TEngine,
  TIntersectionEvent,
  TIntersectionsWatcher,
  TModel3dFacade,
  TModel3dRegistry,
  TMouseWatcherEvent,
  TMoverService,
  TSceneWrapper,
  TSpace,
  TSpaceConfig
} from '@/Engine';
import { defaultMoverServiceConfig, Easing, Engine, isNotDefined, KeyCode, LookUpStrategy, mpsSpeed, spaceService } from '@/Engine';
import { MoverService } from '@/Engine/Services/MoverService/MoverService';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const gui: GUI = new GUI();
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;

  const { actorService, cameraService, intersectionsWatcherService, loopService, mouseService, scenesService, models3dService } = space.services;
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const { findByName, findByTag, findByTags } = actorRegistry;
  const { onKey } = keyboardService;

  const sceneW: TSceneWrapper | undefined = scenesService.findActive();
  if (isNotDefined(sceneW)) throw new Error('Scene is not defined');

  const models3dRegistry: TModel3dRegistry = models3dService.getRegistry();
  const planeModel3dF: TModel3dFacade | undefined = models3dRegistry.findByName('surface_model');
  if (isNotDefined(planeModel3dF)) throw new Error('Plane model is not defined');

  sceneW.addModel3d(planeModel3dF.getModel());

  function init(): void {
    const actorKeyboard: TActorWrapper | undefined = findByTag('keyboard');
    const actorMouse: TActorWrapper | undefined = findByTag('mouse');
    const actorKeyW: TActorWrapper | undefined = findByTags(['key', 'W'], LookUpStrategy.Every);
    const actorKeyA: TActorWrapper | undefined = findByTags(['key', 'A'], LookUpStrategy.Every);
    const actorKeyS: TActorWrapper | undefined = findByTags(['key', 'S'], LookUpStrategy.Every);
    const actorKeyD: TActorWrapper | undefined = findByTags(['key', 'D'], LookUpStrategy.Every);
    const actorMkeyLeft: TActorWrapper | undefined = findByTags(['mkey', 'Left'], LookUpStrategy.Every);
    const actorMkeyRight: TActorWrapper | undefined = findByTags(['mkey', 'Right'], LookUpStrategy.Every);
    const actorMkeyMiddle: TActorWrapper | undefined = findByTags(['mkey', 'Middle'], LookUpStrategy.Every);
    const actorMkeyBack: TActorWrapper | undefined = findByTags(['mkey', 'Back'], LookUpStrategy.Every);
    const actorMkeyForward: TActorWrapper | undefined = findByTags(['mkey', 'Forward'], LookUpStrategy.Every);
    const actorMkeyExtra: TActorWrapper | undefined = findByTags(['mkey', 'Extra'], LookUpStrategy.Every);

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

    onKey(KeyCode.W).pressing$.subscribe(({ delta }): void => void actorKeyboard.addZ(mpsSpeed(-10, delta.delta)));
    onKey(KeyCode.W).pressed$.subscribe((): void => void actorKeyW.addY(-0.2));
    onKey(KeyCode.W).released$.subscribe((): void => void actorKeyW.addY(0.2));

    onKey(KeyCode.A).pressing$.subscribe(({ delta }): void => void actorKeyboard.addX(mpsSpeed(-10, delta.delta)));
    onKey(KeyCode.A).pressed$.subscribe((): void => void actorKeyA.addY(-0.2));
    onKey(KeyCode.A).released$.subscribe((): void => void actorKeyA.addY(0.2));

    onKey(KeyCode.S).pressing$.subscribe(({ delta }): void => void actorKeyboard.addZ(mpsSpeed(10, delta.delta)));
    onKey(KeyCode.S).pressed$.subscribe((): void => void actorKeyS.addY(-0.2));
    onKey(KeyCode.S).released$.subscribe((): void => void actorKeyS.addY(0.2));

    onKey(KeyCode.D).pressing$.subscribe(({ delta }): void => void actorKeyboard.addX(mpsSpeed(10, delta.delta)));
    onKey(KeyCode.D).pressed$.subscribe((): void => void actorKeyD.addY(-0.2));
    onKey(KeyCode.D).released$.subscribe((): void => void actorKeyD.addY(0.2));

    const intersectionsWatcher: TIntersectionsWatcher = startIntersections();
    const coordsUI: { x: number; z: number } = { x: 0, z: 0 };

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

    const moverService: TMoverService = MoverService(loopService, defaultMoverServiceConfig);

    clickLeftRelease$.pipe(withLatestFrom(intersectionsWatcher.value$)).subscribe(([, intersection]: [TMouseWatcherEvent, TIntersectionEvent]): void => {
      void moverService.goToPosition(actorMouse, { x: intersection.point.x, z: intersection.point.z }, { duration: 1000, easing: Easing.EaseInCubic });
    });

    isLeftPressed$.subscribe((isPressed: boolean): void => void actorMkeyLeft.addY(isPressed ? -0.2 : 0.2));
    isRightPressed$.subscribe((isPressed: boolean): void => void actorMkeyRight.addY(isPressed ? -0.2 : 0.2));
    isMiddlePressed$.subscribe((isPressed: boolean): void => void actorMkeyMiddle.addY(isPressed ? -0.2 : 0.2));
    isBackPressed$.subscribe((isPressed: boolean): void => void actorMkeyBack.addY(isPressed ? -0.2 : 0.2));
    isForwardPressed$.subscribe((isPressed: boolean): void => void actorMkeyForward.addY(isPressed ? -0.2 : 0.2));
    isExtraPressed$.subscribe((isPressed: boolean): void => void actorMkeyExtra.addY(isPressed ? -0.2 : 0.2));

    doubleLeftClick$.subscribe((event: TMouseWatcherEvent): void => console.log('double click left', event));
    doubleRightClick$.subscribe((event: TMouseWatcherEvent): void => console.log('double click right', event));

    wheelUp$.subscribe((): void => actorMkeyMiddle.adjustRotationByX(10));
    wheelDown$.subscribe((): void => actorMkeyMiddle.adjustRotationByX(-10));
  }

  function startIntersections(): TIntersectionsWatcher {
    const camera: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(camera)) throw new Error('Camera is not defined');
    const actor: TActorWrapper | undefined = findByName('surface_actor');
    if (isNotDefined(actor)) throw new Error('Actor is not defined');

    return intersectionsWatcherService.create({ actors: [actor], camera, isAutoStart: true, position$: mouseService.position$, tags: [] });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
