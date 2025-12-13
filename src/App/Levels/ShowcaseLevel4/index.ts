import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapper, IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { ambientContext, buildLevelFromConfig, isNotDefined } from '@/Engine';
import type { IAnimationParams } from '@/Engine/Utils/MoveUtils';
import { goToPosition, setLoopForMoveUtils } from '@/Engine/Utils/MoveUtils';

import levelConfig from './showcase-level-4.config.json';

//Showcase 4: Anime.js animations (easing, etc.)
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  function start(): void {
    const loop = level.start();
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

      // TODO (S.Panfilov) debug!!
      setLoopForMoveUtils(loop);

      void goToPosition(topActor, { x: 20, y: topActor.getY(), z: topActor.getZ() }, { ...animationParams, easing: 'easeInCirc' }).then(() => {
        isClickBlocked = false;
      });
      void goToPosition(centralActor, { x: 20, y: centralActor.getY(), z: centralActor.getZ() }, { ...animationParams, easing: 'linear' });
      void goToPosition(bottomActor, { x: 20, y: bottomActor.getY(), z: bottomActor.getZ() }, { ...animationParams, easing: 'easeInOutQuad' });
    });
  }

  return { start, level };
}
