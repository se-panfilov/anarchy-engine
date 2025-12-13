import { Euler, Vector3 } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActor, TActorParams, TActorRegistry, TAppCanvas, TEngine, TMaterialWrapper, TModel3d, TMoverService, TSpace, TSpaceConfig, TSpatialGridWrapper } from '@/Engine';
import { defaultMoverServiceConfig, Engine, forEachEnum, getTags, LookUpStrategy, MaterialType, meters, PrimitiveModel3dType, spaceService, TextType, TransformAgent } from '@/Engine';
import type { TAnimationParams } from '@/Engine/Services';
import { Easing } from '@/Engine/Services';
import { MoverService } from '@/Engine/Services/MoverService/MoverService';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  function start(): void {
    engine.start();
    const { actorService, textService, loopService, mouseService, spatialGridService, materialService, models3dService } = space.services;
    const actorRegistry: TActorRegistry = actorService.getRegistry();

    let isClickBlocked: boolean = false;

    const animationParams: TAnimationParams = {
      duration: 2000,
      direction: 'alternate'
    };

    const boxActorTag: string = 'box';
    const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');

    const materialW: TMaterialWrapper = materialService.create({ name: 'cube_material', type: MaterialType.Toon, options: { color: '#5177ff' } });

    const cubeModel3d: TModel3d = models3dService.create({
      name: 'cube_model',
      model3dSource: PrimitiveModel3dType.Cube,
      animationsSource: [],
      materialSource: materialW,
      options: { width: meters(1), height: meters(1), depth: meters(1) },
      position: new Vector3(0, 0, 0),
      rotation: new Euler(0, 0, 0)
    });

    const actorTemplate: TActorParams = {
      model3dSource: cubeModel3d,
      spatial: { isAutoUpdate: true, grid },
      position: new Vector3(-20, 2, -2),
      rotation: new Euler(0, 0, 0),
      agent: TransformAgent.Connected,
      tags: [boxActorTag]
    };

    const positionZ: number = -30;
    const gap: number = 2;
    forEachEnum(Easing, (easing: string | number, _key: string | number, i: number): void => {
      actorService.create({
        ...actorTemplate,
        name: `box_${easing}`,
        position: new Vector3(-20, 2, positionZ + gap * i),
        tags: [...(actorTemplate.tags ?? []), String(easing)]
      });

      textService.create({
        type: TextType.Text2d,
        text: String(easing),
        cssProps: {
          fontSize: '12px'
        },
        position: new Vector3(-32, 2, positionZ - 1 + gap * i),
        rotation: new Euler(-1.57, 0, 0),
        tags: [...(actorTemplate.tags ?? []), String(easing)]
      });
    });

    mouseService.clickLeftRelease$.subscribe((): void => {
      if (isClickBlocked) {
        console.log('click is blocked');
        isClickBlocked = false;
        return;
      }
      console.log('click is ready', !isClickBlocked);
      isClickBlocked = true;

      const moverService: TMoverService = MoverService(loopService, defaultMoverServiceConfig);

      actorRegistry.findAllByTags([boxActorTag], LookUpStrategy.Some).forEach((actor: TActor): void => {
        const easing = getTags(actor)[1] as Easing;
        void moverService.goToPosition(actor, { x: 20 }, { ...animationParams, easing });
      });
    });
  }

  return { start, space };
}
