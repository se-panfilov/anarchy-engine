import type { IShowcase } from '@/App/Levels/Models';
import { EulerWrapper, IActorParams, IActorWrapper, IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { ActorType, ambientContext, buildLevelFromConfig, forEachEnum, Vector3Wrapper } from '@/Engine';
import type { IAnimationParams } from '@/Engine/Services';
import { Easing, standardMoverService } from '@/Engine/Services';

import levelConfig from './showcase-level-4.config.json';
import { Euler } from 'three';

//Showcase 4: Anime.js simple animations (easing, etc.)
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  function start(): void {
    level.start();
    const { actorRegistry, actorFactory, textRegistry, textFactory } = level.entities;

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
    forEachEnum(Easing, (easing: string | number, _key: string | number, i: number): void => {
      actorFactory.create({
        ...actorTemplate,
        position: Vector3Wrapper({ x: -20, y: 2, z: positionZ + gap * i }),
        tags: [...actorTemplate.tags, String(easing)]
      });

      // TODO (S.Panfilov) add font size
      textFactory.create({
        text: String(easing),
        fontSize: 1,
        position: Vector3Wrapper({ x: -30, y: 2, z: positionZ - 0.5 + gap * i }),
        rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
        tags: [...actorTemplate.tags, String(easing)]
      });
    });

    console.log(textRegistry.getAll());

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
