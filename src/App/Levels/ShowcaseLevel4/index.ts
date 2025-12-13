import type { IShowcase } from '@/App/Levels/Models';
import type { IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { buildLevelFromConfig, CameraTag } from '@/Engine';

import levelConfig from './showcase-level-4.config.json';

//Showcase 4: Anime.js animations (easing, etc.)
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  function start(): void {
    level.start();
    const { actorRegistry, cameraRegistry } = level.entities;

    const camera = cameraRegistry.getUniqByTag(CameraTag.Active);
    console.log(actorRegistry.getAll());
    const actor = actorRegistry.getUniqByTag('central_actor');

    // actor.goTo({ x: 0, y: 0, z: 0 }, 1000, 'easeInOutQuad');
    let direction: number = 1;
    setInterval(() => {
      if (actor?.getX() > 5) direction = -1;
      if (actor?.getX() < -5) direction = 1;
      actor?.setX(actor?.getX() + 0.1 * direction);
      camera.lookAt(actor.getPosition());
    }, 30);

    // goToPosition(actor, { x: 5, y: 0, z: 0 }, 1000, 'easeInOutQuad');
  }

  return { start, level };
}
