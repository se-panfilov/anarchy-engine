import GUI from 'lil-gui';
import { withLatestFrom } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapperAsync, IAppCanvas, ICameraWrapper, IIntersectionEvent, IIntersectionsWatcher, IMouseWatcherEvent, ISpace, ISpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Easing, isNotDefined, keyboardService, KeyCode, LookUpStrategy, mouseService, standardMoverService } from '@/Engine';

import spaceConfig from './showcase-11-keyboard-and-mouse.json';

//Showcase 11: Keyboard and Mouse
export function showcase(canvas: IAppCanvas): IShowcase {
  const gui: GUI = new GUI();
  const space: ISpace = buildSpaceFromConfig(canvas, spaceConfig as ISpaceConfig);
  const { cameraService, intersectionsService } = space.services;
  const { actorRegistry, cameraRegistry } = space.registries;
  if (isNotDefined(actorRegistry)) throw new Error('Actor registry is not defined');
  if (isNotDefined(cameraRegistry)) throw new Error('Camera registry is not defined');
  const { findByTagAsync, findByTagsAsync } = actorRegistry;
  const { onKey } = keyboardService;

  async function init(): Promise<void> {
    const actorKeyboard: IActorWrapperAsync = await findByTagAsync('keyboard');
    const actorMouse: IActorWrapperAsync = await findByTagAsync('mouse');
    const actorKeyW: IActorWrapperAsync = await findByTagsAsync(['key', 'W'], LookUpStrategy.Every);
    const actorKeyA: IActorWrapperAsync = await findByTagsAsync(['key', 'A'], LookUpStrategy.Every);
    const actorKeyS: IActorWrapperAsync = await findByTagsAsync(['key', 'S'], LookUpStrategy.Every);
    const actorKeyD: IActorWrapperAsync = await findByTagsAsync(['key', 'D'], LookUpStrategy.Every);
    const actorMkeyLeft: IActorWrapperAsync = await findByTagsAsync(['mkey', 'Left'], LookUpStrategy.Every);
    const actorMkeyRight: IActorWrapperAsync = await findByTagsAsync(['mkey', 'Right'], LookUpStrategy.Every);
    const actorMkeyMiddle: IActorWrapperAsync = await findByTagsAsync(['mkey', 'Middle'], LookUpStrategy.Every);
    const actorMkeyBack: IActorWrapperAsync = await findByTagsAsync(['mkey', 'Back'], LookUpStrategy.Every);
    const actorMkeyForward: IActorWrapperAsync = await findByTagsAsync(['mkey', 'Forward'], LookUpStrategy.Every);
    const actorMkeyExtra: IActorWrapperAsync = await findByTagsAsync(['mkey', 'Extra'], LookUpStrategy.Every);

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

    clickLeftRelease$.pipe(withLatestFrom(intersectionsWatcher.value$)).subscribe(([, intersection]: [IMouseWatcherEvent, IIntersectionEvent]): void => {
      void standardMoverService.goToPosition(actorMouse, { x: intersection.point.x, z: intersection.point.z }, { duration: 1000, easing: Easing.EaseInCubic });
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
    const camera: ICameraWrapper | undefined = cameraService.findActiveCamera();
    if (isNotDefined(camera)) throw new Error('Camera is not defined');
    const intersectionsWatcher: IIntersectionsWatcher = intersectionsService.buildWatcher(camera);

    await findByTagAsync('surface').then((actor: IActorWrapperAsync) => intersectionsWatcher.addActor(actor));

    intersectionsWatcher.start();
    return intersectionsWatcher;
  }

  function start(): void {
    space.start();
    void init();
  }

  return { start, space };
}
