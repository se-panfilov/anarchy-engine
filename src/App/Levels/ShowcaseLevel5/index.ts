import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapper, IAnimationParams, IAppCanvas, ILevel, ILevelConfig, IWithCoordsXZ } from '@/Engine';
import { ambientContext, buildLevelFromConfig, createCirclePathXZ, Easing, generateAnglesForCircle, isNotDefined, standardMoverService } from '@/Engine';

import levelConfig from './showcase-level-5.config.json';

//Showcase 5: Anime.js complex animations (easing, etc.)
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  function start(): void {
    level.start();
    const { actorRegistry, cameraRegistry, controlsRegistry } = level.entities;

    controlsRegistry.getAll()[0]?.entity.target.set(6, 0, 0);
    cameraRegistry.getAll()[0]?.setPosition(6, 30, 0);

    const actor: IActorWrapper | undefined = actorRegistry.getUniqByTag('actor');
    if (isNotDefined(actor)) throw new Error('Actor is not defined');
    let isClickBlocked: boolean = false;

    const animationParams: IAnimationParams = {
      duration: 2000,
      direction: 'normal'
    };

    ambientContext.mouseClickWatcher.value$.subscribe(() => {
      if (isClickBlocked) {
        console.log('click is blocked');
        isClickBlocked = false;
        return;
      }
      isClickBlocked = true;

      const numberOfPoints: number = 6;
      const numberOfCircles: number = 0.3;
      const startAngle: number = 100;
      const radius: number = 15;
      const angleArray: ReadonlyArray<number> = generateAnglesForCircle(numberOfPoints, numberOfCircles, startAngle);

      const path: ReadonlyArray<IWithCoordsXZ> = createCirclePathXZ(angleArray, radius, { x: 0, z: 0 });
      void standardMoverService.goByPath(actor, path, { ...animationParams, easing: Easing.EaseInCubic });
    });
  }

  return { start, level };
}
