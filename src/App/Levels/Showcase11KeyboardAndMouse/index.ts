import GUI from 'lil-gui';
import { withLatestFrom } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapperAsync, IAppCanvas, ICameraWrapper, IIntersectionEvent, IIntersectionsWatcher, ILevel, ILevelConfig, IMouseWatcherEvent } from '@/Engine';
import { buildLevelFromConfig, Easing, intersectionsService, isNotDefined, keyboardService, KeyCode, mouseService, standardMoverService, LookUpStrategy } from '@/Engine';

import levelConfig from './showcase-11-keyboard-and-mouse.json';

//Showcase 11: Keyboard and Mouse
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const gui: GUI = new GUI();
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { actorRegistry, cameraRegistry } = level.entities;

  async function init(): Promise<void> {
    const actorKeyboard: IActorWrapperAsync = await actorRegistry.getUniqByTagAsync('keyboard');
    const actorMouse: IActorWrapperAsync = await actorRegistry.getUniqByTagAsync('mouse');
    const actorKeyW: IActorWrapperAsync = await actorRegistry.getUniqByTagsAsync(['key', 'W'], LookUpStrategy.Every);
    const actorKeyA: IActorWrapperAsync = await actorRegistry.getUniqByTagsAsync(['key', 'A'], LookUpStrategy.Every);
    const actorKeyS: IActorWrapperAsync = await actorRegistry.getUniqByTagsAsync(['key', 'S'], LookUpStrategy.Every);
    const actorKeyD: IActorWrapperAsync = await actorRegistry.getUniqByTagsAsync(['key', 'D'], LookUpStrategy.Every);

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

    //console output of mouse events
    mouseService.clickLeftRelease$.subscribe((event: IMouseWatcherEvent): void => console.log('click left', event));
    mouseService.clickRightRelease$.subscribe((event: IMouseWatcherEvent): void => console.log('click right', event));
    mouseService.clickMiddleRelease$.subscribe((event: IMouseWatcherEvent): void => console.log('click middle', event));
    mouseService.clickBackRelease$.subscribe((event: IMouseWatcherEvent): void => console.log('click back', event));
    mouseService.clickForwardRelease$.subscribe((event: IMouseWatcherEvent): void => console.log('click forward', event));
    mouseService.clickExtraRelease$.subscribe((event: IMouseWatcherEvent): void => console.log('click extra', event));

    mouseService.isLeftPressed$.subscribe((isPressed: boolean): void => console.log('left pressed', isPressed));
    mouseService.isRightPressed$.subscribe((isPressed: boolean): void => console.log('right pressed', isPressed));
    mouseService.isMiddlePressed$.subscribe((isPressed: boolean): void => console.log('middle pressed', isPressed));
    mouseService.isBackPressed$.subscribe((isPressed: boolean): void => console.log('back pressed', isPressed));
    mouseService.isForwardPressed$.subscribe((isPressed: boolean): void => console.log('forward pressed', isPressed));
    mouseService.isExtraPressed$.subscribe((isPressed: boolean): void => console.log('extra pressed', isPressed));

    mouseService.doubleLeftClick$.subscribe((event: IMouseWatcherEvent): void => console.log('double click left', event));
    mouseService.doubleRightClick$.subscribe((event: IMouseWatcherEvent): void => console.log('double click right', event));

    mouseService.wheelUp$.subscribe((event: IMouseWatcherEvent): void => console.log('wheel up', event));
    mouseService.wheelDown$.subscribe((event: IMouseWatcherEvent): void => console.log('wheel down', event));
  }

  async function startIntersections(): Promise<IIntersectionsWatcher> {
    const camera: ICameraWrapper | undefined = cameraRegistry.getActiveCamera();
    if (isNotDefined(camera)) throw new Error('Camera is not defined');
    const intersectionsWatcher: IIntersectionsWatcher = intersectionsService.buildWatcher(camera);

    await actorRegistry.getUniqByTagAsync('surface').then((actor: IActorWrapperAsync) => intersectionsWatcher.addActor(actor));

    intersectionsWatcher.start();
    return intersectionsWatcher;
  }

  function start(): void {
    level.start();
    void init();
  }

  return { start, level };
}
