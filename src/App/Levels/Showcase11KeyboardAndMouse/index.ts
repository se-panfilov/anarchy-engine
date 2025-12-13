import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapperAsync, IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { buildLevelFromConfig, mouseService } from '@/Engine';

import levelConfig from './showcase-11-keyboard-and-mouse.json';

//Showcase 11: Keyboard and Mouse
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { actorRegistry } = level.entities;

  async function init(): Promise<void> {
    const actorKeyboard: IActorWrapperAsync = await actorRegistry.getUniqByTagAsync('keyboard');
    const actorMouse: IActorWrapperAsync = await actorRegistry.getUniqByTagAsync('mouse');

    mouseService.position$.subscribe((x) => {
      console.log(x);
    });
  }

  function start(): void {
    level.start();
    void init();
  }

  return { start, level };
}
