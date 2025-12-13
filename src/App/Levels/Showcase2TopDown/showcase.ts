import { combineLatest } from 'rxjs';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActorParams, TAppCanvas, TCameraWrapper, TEngine, TSpace, TSpaceConfig, TSpatialGridWrapper } from '@/Engine';
import { ambientContext, buildSpaceFromConfig, Engine, EulerWrapper, isNotDefined, MaterialType, PrimitiveModel3dType, Vector3Wrapper } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  function start(): void {
    engine.start();
    const { actorService, spatialGridService, cameraService, mouseService } = space.services;
    const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');
    if (isNotDefined(grid)) throw new Error(`Cannot find "main_grid" grid`);

    const actorDefaultParams: TActorParams = {
      model3d: { url: PrimitiveModel3dType.Cube },
      position: Vector3Wrapper({ x: 0, y: 0, z: 0 }),
      castShadow: true,
      material: { type: MaterialType.Toon, params: { color: '#5177ff' } },
      spatial: { grid, isAutoUpdate: false },
      tags: []
    };

    const centralActorTag: string = 'central';

    const actorParams1: TActorParams = { ...actorDefaultParams, position: Vector3Wrapper({ x: 2, y: 2, z: 0 }) };
    const actorParams2: TActorParams = { ...actorDefaultParams, position: Vector3Wrapper({ x: -2, y: 0, z: 0 }) };
    const actorParams3: TActorParams = { ...actorDefaultParams, position: Vector3Wrapper({ x: 0, y: 1, z: 0 }), tags: [centralActorTag] };
    const actorParams4: TActorParams = { ...actorDefaultParams, position: Vector3Wrapper({ x: -2, y: 2, z: 0 }) };
    const actorParams5: TActorParams = { ...actorDefaultParams, position: Vector3Wrapper({ x: 2, y: 0, z: 0 }) };

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    [actorParams1, actorParams2, actorParams3, actorParams4, actorParams5].forEach((actor: TActorParams) => actorService.create(actor));

    const camera: TCameraWrapper = cameraService.create({
      position: Vector3Wrapper({ x: 0, y: 0, z: 3 }),
      rotation: EulerWrapper({ x: 0, y: 0, z: 0 }),
      isActive: true,
      tags: []
    });

    const { screenSizeWatcher } = ambientContext;
    combineLatest([mouseService.position$, screenSizeWatcher.latest$]).subscribe(([{ coords }, { width, height }]): void => {
      if (isNotDefined(camera)) return;
      const xRatio: number = coords.x / width - 0.5;
      const yRatio: number = -(coords.y / height - 0.5);
      camera.setX(xRatio * 5);
      camera.setY(yRatio * 5);
    });
  }

  return { start, space };
}
