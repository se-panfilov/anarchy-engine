import type { TShowcase } from '@/App/Levels/Models';
import type { TActorAsyncRegistry, IActorParams, TActorWrapperAsync, TAppCanvas, TEngine, IMoverService, TSpace, TSpaceConfig } from '@/Engine';
import { ActorType, buildSpaceFromConfig, defaultMoverServiceConfig, Engine, EulerWrapper, forEachEnum, LookUpStrategy, MaterialType, mouseService, TextType, Vector3Wrapper } from '@/Engine';
import type { IAnimationParams } from '@/Engine/Services';
import { Easing } from '@/Engine/Services';
import { MoverService } from '@/Engine/Services/MoverService/MoverService';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { loopService } = engine.services;

  function start(): void {
    engine.start();
    const { actorService, textService } = space.services;
    const actorRegistry: TActorAsyncRegistry = actorService.getRegistry();

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
      material: { type: MaterialType.Toon, params: { color: '#5177ff' } },
      tags: [boxActorTag]
    };

    const positionZ: number = -30;
    const gap: number = 2;
    forEachEnum(Easing, (easing: string | number, _key: string | number, i: number): void => {
      void actorService.createAsync({
        ...actorTemplate,
        position: Vector3Wrapper({ x: -20, y: 2, z: positionZ + gap * i }),
        tags: [...actorTemplate.tags, String(easing)]
      });

      textService.create({
        type: TextType.Text2d,
        text: String(easing),
        cssProps: {
          fontSize: '12px'
        },
        position: Vector3Wrapper({ x: -32, y: 2, z: positionZ - 1 + gap * i }),
        rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
        tags: [...actorTemplate.tags, String(easing)]
      });
    });

    mouseService.clickLeftRelease$.subscribe(() => {
      if (isClickBlocked) {
        console.log('click is blocked');
        isClickBlocked = false;
        return;
      }
      console.log('click is ready', !isClickBlocked);
      isClickBlocked = true;

      const moverService: IMoverService = MoverService(loopService, defaultMoverServiceConfig);

      actorRegistry.findAllByTags([boxActorTag], LookUpStrategy.Some).forEach((actor: TActorWrapperAsync) => {
        const easing = actor.getTags()[1] as Easing;
        void moverService.goToPosition(actor, { x: 20 }, { ...animationParams, easing });
      });
    });
  }

  return { start, space };
}
