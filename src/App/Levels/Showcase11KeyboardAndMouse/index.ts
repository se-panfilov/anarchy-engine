import GUI from 'lil-gui';
import { withLatestFrom } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import type {
  IActorAsyncRegistry,
  IActorWrapperAsync,
  IAppCanvas,
  ICameraRegistry,
  ICameraWrapper,
  IEngine,
  IIntersectionEvent,
  IIntersectionsWatcher,
  IMouseWatcherEvent,
  IMoverService,
  ISpace,
  ISpaceConfig
} from '@/Engine';
import { buildSpaceFromConfig, defaultMoverServiceConfig, Easing, Engine, isNotDefined, KeyCode, LookUpStrategy, mouseService } from '@/Engine';
import { MoverService } from '@/Engine/Services/MoverService/MoverService';

import spaceConfig from './showcase-11.json';

//Showcase 11: Keyboard and Mouse
export function showcase(canvas: IAppCanvas): IShowcase {
  const gui: GUI = new GUI();
  const space: ISpace = buildSpaceFromConfig(canvas, spaceConfig as ISpaceConfig);
  const engine: IEngine = Engine(space);
  const { keyboardService } = engine.services;

  const { actorService, cameraService, intersectionsWatcherService } = space.services;
  const actorRegistry: IActorAsyncRegistry = actorService.getRegistry();
  const cameraRegistry: ICameraRegistry = cameraService.getRegistry();
  if (isNotDefined(actorRegistry)) throw new Error('Actor registry is not defined');
  if (isNotDefined(cameraRegistry)) throw new Error('Camera registry is not defined');
  const { findByNameAsync, findByTagAsync, findByTagsAsync } = actorRegistry;
  const { onKey } = keyboardService;

  async function init(): Promise<void> {
    const actorKeyboard: IActorWrapperAsync | undefined = await findByTagAsync('keyboard');
    const actorMouse: IActorWrapperAsync | undefined = await findByTagAsync('mouse');
    const actorKeyW: IActorWrapperAsync | undefined = await findByTagsAsync(['key', 'W'], LookUpStrategy.Every);
    const actorKeyA: IActorWrapperAsync | undefined = await findByTagsAsync(['key', 'A'], LookUpStrategy.Every);
    const actorKeyS: IActorWrapperAsync | undefined = await findByTagsAsync(['key', 'S'], LookUpStrategy.Every);
    const actorKeyD: IActorWrapperAsync | undefined = await findByTagsAsync(['key', 'D'], LookUpStrategy.Every);
    const actorMkeyLeft: IActorWrapperAsync | undefined = await findByTagsAsync(['mkey', 'Left'], LookUpStrategy.Every);
    const actorMkeyRight: IActorWrapperAsync | undefined = await findByTagsAsync(['mkey', 'Right'], LookUpStrategy.Every);
    const actorMkeyMiddle: IActorWrapperAsync | undefined = await findByTagsAsync(['mkey', 'Middle'], LookUpStrategy.Every);
    const actorMkeyBack: IActorWrapperAsync | undefined = await findByTagsAsync(['mkey', 'Back'], LookUpStrategy.Every);
    const actorMkeyForward: IActorWrapperAsync | undefined = await findByTagsAsync(['mkey', 'Forward'], LookUpStrategy.Every);
    const actorMkeyExtra: IActorWrapperAsync | undefined = await findByTagsAsync(['mkey', 'Extra'], LookUpStrategy.Every);

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

    onKey(KeyCode.W).pressing$.subscribe((): void => void actorKeyboard.addZ(-0.3));
    onKey(KeyCode.W).pressed$.subscribe((): void => void actorKeyW.addY(-0.2));
    onKey(KeyCode.W).released$.subscribe((): void => void actorKeyW.addY(0.2));

    onKey(KeyCode.A).pressing$.subscribe((): void => void actorKeyboard.addX(-0.3));
    onKey(KeyCode.A).pressed$.subscribe((): void => void actorKeyA.addY(-0.2));
    onKey(KeyCode.A).released$.subscribe((): void => void actorKeyA.addY(0.2));

    onKey(KeyCode.S).pressing$.subscribe((): void => void actorKeyboard.addZ(0.3));
    onKey(KeyCode.S).pressed$.subscribe((): void => void actorKeyS.addY(-0.2));
    onKey(KeyCode.S).released$.subscribe((): void => void actorKeyS.addY(0.2));

    onKey(KeyCode.D).pressing$.subscribe((): void => void actorKeyboard.addX(0.3));
    onKey(KeyCode.D).pressed$.subscribe((): void => void actorKeyD.addY(-0.2));
    onKey(KeyCode.D).released$.subscribe((): void => void actorKeyD.addY(0.2));

    const intersectionsWatcher: IIntersectionsWatcher = await startIntersections();
    const coordsUI: { x: number; z: number } = { x: 0, z: 0 };

    gui.add(coordsUI, 'x').listen();
    gui.add(coordsUI, 'z').listen();

    intersectionsWatcher.value$.subscribe((intersection: IIntersectionEvent): void => {
      // eslint-disable-next-line functional/immutable-data
      coordsUI.x = intersection.point.x;
      // eslint-disable-next-line functional/immutable-data
      coordsUI.z = intersection.point.z;
    });

    const { clickLeftRelease$, isLeftPressed$, isRightPressed$, isMiddlePressed$, isBackPressed$, isForwardPressed$, isExtraPressed$, doubleLeftClick$, doubleRightClick$, wheelUp$, wheelDown$ } =
      mouseService;

    const moverService: IMoverService = MoverService(engine.services.loopService, defaultMoverServiceConfig);

    clickLeftRelease$.pipe(withLatestFrom(intersectionsWatcher.value$)).subscribe(([, intersection]: [IMouseWatcherEvent, IIntersectionEvent]): void => {
      void moverService.goToPosition(actorMouse, { x: intersection.point.x, z: intersection.point.z }, { duration: 1000, easing: Easing.EaseInCubic });
    });

    isLeftPressed$.subscribe((isPressed: boolean): void => void actorMkeyLeft.addY(isPressed ? -0.2 : 0.2));
    isRightPressed$.subscribe((isPressed: boolean): void => void actorMkeyRight.addY(isPressed ? -0.2 : 0.2));
    isMiddlePressed$.subscribe((isPressed: boolean): void => void actorMkeyMiddle.addY(isPressed ? -0.2 : 0.2));
    isBackPressed$.subscribe((isPressed: boolean): void => void actorMkeyBack.addY(isPressed ? -0.2 : 0.2));
    isForwardPressed$.subscribe((isPressed: boolean): void => void actorMkeyForward.addY(isPressed ? -0.2 : 0.2));
    isExtraPressed$.subscribe((isPressed: boolean): void => void actorMkeyExtra.addY(isPressed ? -0.2 : 0.2));

    doubleLeftClick$.subscribe((event: IMouseWatcherEvent): void => console.log('double click left', event));
    doubleRightClick$.subscribe((event: IMouseWatcherEvent): void => console.log('double click right', event));

    wheelUp$.subscribe((): void => actorMkeyMiddle.adjustRotationByX(10));
    wheelDown$.subscribe((): void => actorMkeyMiddle.adjustRotationByX(-10));
  }

  async function startIntersections(): Promise<IIntersectionsWatcher> {
    const camera: ICameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(camera)) throw new Error('Camera is not defined');
    const actor: IActorWrapperAsync | undefined = await findByNameAsync('surface');
    if (isNotDefined(actor)) throw new Error('Actor is not defined');

    return intersectionsWatcherService.create({ actors: [actor], camera, isAutoStart: true, position$: mouseService.position$, tags: [] });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
