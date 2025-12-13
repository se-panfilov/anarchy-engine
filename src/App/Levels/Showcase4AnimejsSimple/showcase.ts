import type { TShowcase } from '@/App/Levels/Models';
import type { TActorParams, TActorRegistry, TActorWrapper, TAppCanvas, TEngine, TMoverService, TSpace, TSpaceConfig, TSpatialGridWrapper } from '@/Engine';
import { buildSpaceFromConfig, defaultMoverServiceConfig, Engine, EulerWrapper, forEachEnum, LookUpStrategy, MaterialType, PrimitiveModel3dType, TextType, Vector3Wrapper } from '@/Engine';
import type { TAnimationParams } from '@/Engine/Services';
import { Easing } from '@/Engine/Services';
import { MoverService } from '@/Engine/Services/MoverService/MoverService';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  function start(): void {
    engine.start();
    const { actorService, textService, loopService, mouseService, spatialGridService } = space.services;
    const actorRegistry: TActorRegistry = actorService.getRegistry();

    let isClickBlocked: boolean = false;

    const animationParams: TAnimationParams = {
      duration: 2000,
      direction: 'alternate'
    };

    const boxActorTag: string = 'box';
    const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');

    const actorTemplate: TActorParams = {
      model3d: { url: PrimitiveModel3dType.Cube },
      width: 1,
      height: 1,
      position: Vector3Wrapper({ x: -20, y: 2, z: -2 }),
      castShadow: true,
      material: { type: MaterialType.Toon, params: { color: '#5177ff' } },
      spatial: { isAutoUpdate: true, grid },
      tags: [boxActorTag]
    };

    const positionZ: number = -30;
    const gap: number = 2;
    forEachEnum(Easing, (easing: string | number, _key: string | number, i: number): void => {
      actorService.create({
        ...actorTemplate,
        position: Vector3Wrapper({ x: -20, y: 2, z: positionZ + gap * i }),
        tags: [...(actorTemplate.tags ?? []), String(easing)]
      });

      textService.create({
        type: TextType.Text2d,
        text: String(easing),
        cssProps: {
          fontSize: '12px'
        },
        position: Vector3Wrapper({ x: -32, y: 2, z: positionZ - 1 + gap * i }),
        rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
        tags: [...(actorTemplate.tags ?? []), String(easing)]
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

      const moverService: TMoverService = MoverService(loopService, defaultMoverServiceConfig);

      actorRegistry.findAllByTags([boxActorTag], LookUpStrategy.Some).forEach((actor: TActorWrapper) => {
        const easing = actor.getTags()[1] as Easing;
        void moverService.goToPosition(actor, { x: 20 }, { ...animationParams, easing });
      });
    });
  }

  return { start, space };
}
