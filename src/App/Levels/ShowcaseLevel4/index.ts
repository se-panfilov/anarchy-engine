import type { IShowcase } from '@/App/Levels/Models';
import type { IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { ambientContext, buildLevelFromConfig, CameraTag, isDefined } from '@/Engine';

import levelConfig from './showcase-level-4.config.json';

//Showcase 4: Anime.js animations (easing, etc.)
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  function start(): void {
    level.start();
    const { actorRegistry, cameraRegistry } = level.entities;

    const camera = cameraRegistry.getUniqByTag(CameraTag.Active);

    const { mousePositionWatcher, screenSizeWatcher } = ambientContext;
    const actor = actorRegistry.getAll()[0];

    actor.goTo({ x: 0, y: 0, z: 0 }, 1000, 'easeInOutQuad');

    // if (isDefined(actor)) camera.lookAt(actor.getPosition());
  }

  return { start, level };
}
