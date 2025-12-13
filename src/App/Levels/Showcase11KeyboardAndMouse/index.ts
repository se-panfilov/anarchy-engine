import GUI from 'lil-gui';
import { withLatestFrom } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapperAsync, IAppCanvas, ICameraWrapper, IIntersectionEvent, IIntersectionsWatcher, ISpace, ISpaceConfig, IMouseWatcherEvent } from '@/Engine';
import { buildLevelFromConfig, Easing, intersectionsService, isNotDefined, keyboardService, KeyCode, LookUpStrategy, mouseService, standardMoverService } from '@/Engine';

import spaceConfig from './showcase-11-keyboard-and-mouse.json';

//Showcase 11: Keyboard and Mouse
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const gui: GUI = new GUI();
  const level: ISpace = buildLevelFromConfig(canvas, spaceConfig as ISpaceConfig);
  const { actorRegistry, cameraRegistry } = level.entities;

  async function init(): Promise<void> {
    const actorKeyboard: IActorWrapperAsync = await actorRegistry.findByTagAsync('keyboard');
    const actorMouse: IActorWrapperAsync = await actorRegistry.findByTagAsync('mouse');
    const actorKeyW: IActorWrapperAsync = await actorRegistry.findByTagsAsync(['key', 'W'], LookUpStrategy.Every);
    const actorKeyA: IActorWrapperAsync = await actorRegistry.findByTagsAsync(['key', 'A'], LookUpStrategy.Every);
    const actorKeyS: IActorWrapperAsync = await actorRegistry.findByTagsAsync(['key', 'S'], LookUpStrategy.Every);
    const actorKeyD: IActorWrapperAsync = await actorRegistry.findByTagsAsync(['key', 'D'], LookUpStrategy.Every);
    const actorMkeyLeft: IActorWrapperAsync = await actorRegistry.findByTagsAsync(['mkey', 'Left'], LookUpStrategy.Every);
    const actorMkeyRight: IActorWrapperAsync = await actorRegistry.findByTagsAsync(['mkey', 'Right'], LookUpStrategy.Every);
    const actorMkeyMiddle: IActorWrapperAsync = await actorRegistry.findByTagsAsync(['mkey', 'Middle'], LookUpStrategy.Every);
    const actorMkeyBack: IActorWrapperAsync = await actorRegistry.findByTagsAsync(['mkey', 'Back'], LookUpStrategy.Every);
    const actorMkeyForward: IActorWrapperAsync = await actorRegistry.findByTagsAsync(['mkey', 'Forward'], LookUpStrategy.Every);
    const actorMkeyExtra: IActorWrapperAsync = await actorRegistry.findByTagsAsync(['mkey', 'Extra'], LookUpStrategy.Every);

    keyboardService.onKey(KeyCode.W).pressing$.subscribe((): void => void actorKeyboard.addZ(-0.3));
    keyboardService.onKey(KeyCode.W).pressed$.subscribe((): void => void actorKeyW.addY(-0.2));
    keyboardService.onKey(KeyCode.W).released$.subscribe((): void => void actorKeyW.addY(0.2));

    keyboardService.onKey(KeyCode.A).pressing$.subscribe((): void => void actorKeyboard.addX(-0.3));
    keyboardService.onKey(KeyCode.A).pressed$.subscribe((): void => void actorKeyA.addY(-0.2));
    keyboardService.onKey(KeyCode.A).released$.subscribe((): void => void actorKeyA.addY(0.2));

    keyboardService.onKey(KeyCode.S).pressing$.subscribe((): void => void actorKeyboard.addZ(0.3));
    keyboardService.onKey(KeyCode.S).pressed$.subscribe((): void => void actorKeyS.addY(-0.2));
    keyboardService.onKey(KeyCode.S).released$.subscribe((): void => void actorKeyS.addY(0.2));

    keyboardService.onKey(KeyCode.D).pressing$.subscribe((): void => void actorKeyboard.addX(0.3));
    keyboardService.onKey(KeyCode.D).pressed$.subscribe((): void => void actorKeyD.addY(-0.2));
    keyboardService.onKey(KeyCode.D).released$.subscribe((): void => void actorKeyD.addY(0.2));

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

    mouseService.clickLeftRelease$.pipe(withLatestFrom(intersectionsWatcher.value$)).subscribe(([, intersection]: [IMouseWatcherEvent, IIntersectionEvent]): void => {
      void standardMoverService.goToPosition(actorMouse, { x: intersection.point.x, z: intersection.point.z }, { duration: 1000, easing: Easing.EaseInCubic });
    });

    mouseService.isLeftPressed$.subscribe((isPressed: boolean): void => void actorMkeyLeft.addY(isPressed ? -0.2 : 0.2));
    mouseService.isRightPressed$.subscribe((isPressed: boolean): void => void actorMkeyRight.addY(isPressed ? -0.2 : 0.2));
    mouseService.isMiddlePressed$.subscribe((isPressed: boolean): void => void actorMkeyMiddle.addY(isPressed ? -0.2 : 0.2));
    mouseService.isBackPressed$.subscribe((isPressed: boolean): void => void actorMkeyBack.addY(isPressed ? -0.2 : 0.2));
    mouseService.isForwardPressed$.subscribe((isPressed: boolean): void => void actorMkeyForward.addY(isPressed ? -0.2 : 0.2));
    mouseService.isExtraPressed$.subscribe((isPressed: boolean): void => void actorMkeyExtra.addY(isPressed ? -0.2 : 0.2));

    mouseService.doubleLeftClick$.subscribe((event: IMouseWatcherEvent): void => console.log('double click left', event));
    mouseService.doubleRightClick$.subscribe((event: IMouseWatcherEvent): void => console.log('double click right', event));

    mouseService.wheelUp$.subscribe((): void => actorMkeyMiddle.adjustRotationByX(10));
    mouseService.wheelDown$.subscribe((): void => actorMkeyMiddle.adjustRotationByX(-10));
  }

  async function startIntersections(): Promise<IIntersectionsWatcher> {
    const camera: ICameraWrapper | undefined = cameraRegistry.getActiveCamera();
    if (isNotDefined(camera)) throw new Error('Camera is not defined');
    const intersectionsWatcher: IIntersectionsWatcher = intersectionsService.buildWatcher(camera);

    await actorRegistry.findByTagAsync('surface').then((actor: IActorWrapperAsync) => intersectionsWatcher.addActor(actor));

    intersectionsWatcher.start();
    return intersectionsWatcher;
  }

  function start(): void {
    level.start();
    void init();
  }

  return { start, level };
}
