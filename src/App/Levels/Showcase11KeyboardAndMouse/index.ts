import type { IShowcase } from '@/App/Levels/Models';
import { IActorWrapperAsync, IAppCanvas, type IGameKey, ILevel, ILevelConfig, IMouseWatcherEvent, keyboardService, KeyCode } from '@/Engine';
import { buildLevelFromConfig, mouseService } from '@/Engine';

import levelConfig from './showcase-11-keyboard-and-mouse.json';

//Showcase 11: Keyboard and Mouse
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { actorRegistry } = level.entities;

  async function init(): Promise<void> {
    const actorKeyboard: IActorWrapperAsync = await actorRegistry.getUniqByTagAsync('keyboard');
    const actorMouse: IActorWrapperAsync = await actorRegistry.getUniqByTagAsync('mouse');

    keyboardService.onKey(KeyCode.W).pressing$.subscribe((): void => void actorKeyboard.addZ(-0.3));
    keyboardService.onKey(KeyCode.S).pressing$.subscribe((): void => void actorKeyboard.addZ(0.3));
    keyboardService.onKey(KeyCode.A).pressing$.subscribe((): void => void actorKeyboard.addX(-0.3));
    keyboardService.onKey(KeyCode.D).pressing$.subscribe((): void => void actorKeyboard.addX(0.3));

    mouseService.clickLeftRelease$.subscribe((event: IMouseWatcherEvent): void => console.log('click left', event));
    mouseService.clickRightRelease$.subscribe((event: IMouseWatcherEvent): void => console.log('click right', event));
    mouseService.clickMiddleRelease$.subscribe((event: IMouseWatcherEvent): void => console.log('click middle', event));
    mouseService.clickBackRelease$.subscribe((event: IMouseWatcherEvent): void => console.log('click back', event));
    mouseService.clickForwardRelease$.subscribe((event: IMouseWatcherEvent): void => console.log('click forward', event));
    mouseService.clickExtraRelease$.subscribe((event: IMouseWatcherEvent): void => console.log('click extra', event));

    mouseService.doubleLeftClick$.subscribe((event: IMouseWatcherEvent): void => console.log('double click left', event));
    mouseService.doubleRightClick$.subscribe((event: IMouseWatcherEvent): void => console.log('double click right', event));

    mouseService.wheelUp$.subscribe((event: IMouseWatcherEvent): void => console.log('wheel up', event));
    mouseService.wheelDown$.subscribe((event: IMouseWatcherEvent): void => console.log('wheel down', event));
  }

  function start(): void {
    level.start();
    void init();
  }

  return { start, level };
}
