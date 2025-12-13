import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapper, IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { ambientContext, buildLevelFromConfig, isNotDefined } from '@/Engine';
import type { IAnimationParams } from '@/Engine/Services';
import { Easing, standardMoverService } from '@/Engine/Services';

import levelConfig from './showcase-level-4.config.json';

//Showcase 4: Anime.js simple animations (easing, etc.)
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  function start(): void {
    level.start();
    const { actorRegistry, cameraRegistry, controlsRegistry } = level.entities;

    // TODO (S.Panfilov) we need setTarget for controls
    controlsRegistry.getAll()[0]?.entity.target.set(6, 0, 0);
    cameraRegistry.getAll()[0]?.setPosition(6, 30, 0);

    const topActor: IActorWrapper | undefined = actorRegistry.getUniqByTag('top_actor');
    const centralActor: IActorWrapper | undefined = actorRegistry.getUniqByTag('central_actor');
    const bottomActor: IActorWrapper | undefined = actorRegistry.getUniqByTag('bottom_actor');
    if (isNotDefined(topActor) || isNotDefined(centralActor) || isNotDefined(bottomActor)) throw new Error('Actors are not defined');

    let isClickBlocked: boolean = false;

    const animationParams: IAnimationParams = {
      duration: 2000,
      direction: 'alternate'
    };

    ambientContext.mouseClickWatcher.value$.subscribe(() => {
      if (isClickBlocked) {
        console.log('click is blocked');
        isClickBlocked = false;
        return;
      }
      console.log('click is ready', !isClickBlocked);
      isClickBlocked = true;

      void standardMoverService.goToPosition(topActor, { x: 20 }, { ...animationParams, easing: Easing.EaseInCirc }).then(() => {
        isClickBlocked = false;
      });
      void standardMoverService.goToPosition(centralActor, { x: 20 }, { ...animationParams, easing: Easing.Linear });
      void standardMoverService.goToPosition(bottomActor, { x: 20 }, { ...animationParams, easing: Easing.EaseInOutQuad });
    });
  }

  return { start, level };
}
