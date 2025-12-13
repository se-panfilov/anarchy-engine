import type { IShowcase } from '@/App/Levels/Models';
import type { IActorParams, IActorWrapper, IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { ActorType, ambientContext, buildLevelFromConfig, forEachEnum, Vector3Wrapper } from '@/Engine';
import type { IAnimationParams } from '@/Engine/Services';
import { Easing, standardMoverService } from '@/Engine/Services';

import levelConfig from './showcase-level-4.config.json';

//Showcase 4: Anime.js simple animations (easing, etc.)
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  function start(): void {
    level.start();
    const { actorRegistry, actorFactory } = level.entities;

    let isClickBlocked: boolean = false;

    const animationParams: IAnimationParams = {
      duration: 2000,
      direction: 'alternate'
    };

    const boxActorTag: string = 'box';

    const actorTemplate: IActorParams = {
      type: ActorType.cube,
      width: 1,
      height: 1,
      position: Vector3Wrapper({ x: -20, y: 2, z: -2 }),
      castShadow: true,
      materialParams: { color: '#5177ff' },
      tags: [boxActorTag]
    };

    const positionZ = -30;
    const gap = 2;
    forEachEnum(Easing, (easing: string | number, key: string | number, i: number): void => {
      actorFactory.create({
        ...actorTemplate,
        position: Vector3Wrapper({ x: -20, y: 2, z: positionZ + gap * i }),
        tags: [...actorTemplate.tags, String(easing)]
      });
    });

    ambientContext.mouseClickWatcher.value$.subscribe(() => {
      if (isClickBlocked) {
        console.log('click is blocked');
        isClickBlocked = false;
        return;
      }
      console.log('click is ready', !isClickBlocked);
      isClickBlocked = true;

      actorRegistry.getAllWithSomeTag([boxActorTag]).forEach((actor: IActorWrapper) => {
        const easing = actor.getTags()[1] as Easing;
        void standardMoverService.goToPosition(actor, { x: 20 }, { ...animationParams, easing });
      });
    });
  }

  return { start, level };
}
