import { combineLatest } from 'rxjs';
import { Euler, Vector3 } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActorParams, TAppCanvas, TCameraWrapper, TEngine, TMaterialWrapper, TModel3d, TModels3dService, TSpace, TSpaceConfig, TSpatialGridWrapper } from '@/Engine';
import { ambientContext, Engine, isNotDefined, MaterialType, meters, PrimitiveModel3dType, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  function start(): void {
    engine.start();
    const { actorService, spatialGridService, cameraService, materialService, models3dService, mouseService } = space.services;
    const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');
    if (isNotDefined(grid)) throw new Error(`Cannot find "main_grid" grid`);

    const materialW: TMaterialWrapper = materialService.create({ name: 'model_material', type: MaterialType.Toon, options: { color: '#5177ff' } });

    const actorDefaultParams: Omit<TActorParams, 'model3dSource'> = {
      position: new Vector3(),
      rotation: new Euler(),
      spatial: { grid, isAutoUpdate: false }
    };

    const actorParams1: TActorParams = { ...actorDefaultParams, model3dSource: createCube(models3dService, 'cube1', materialW), position: new Vector3(2, 2, 0) };
    const actorParams2: TActorParams = { ...actorDefaultParams, model3dSource: createCube(models3dService, 'cube2', materialW), position: new Vector3(-2, 0, 0) };
    const actorParams3: TActorParams = { ...actorDefaultParams, model3dSource: createCube(models3dService, 'cube3', materialW), position: new Vector3(0, 1, 0) };
    const actorParams4: TActorParams = { ...actorDefaultParams, model3dSource: createCube(models3dService, 'cube4', materialW), position: new Vector3(-2, 2, 0) };
    const actorParams5: TActorParams = { ...actorDefaultParams, model3dSource: createCube(models3dService, 'cube5', materialW), position: new Vector3(2, 0, 0) };

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    [actorParams1, actorParams2, actorParams3, actorParams4, actorParams5].forEach((actor: TActorParams) => actorService.create(actor));

    const camera: TCameraWrapper = cameraService.create({
      position: new Vector3(0, 0, 3),
      rotation: new Euler(),
      isActive: true
    });

    const { screenSizeWatcher } = ambientContext;
    combineLatest([mouseService.position$, screenSizeWatcher.value$]).subscribe(([coords, { width, height }]): void => {
      if (isNotDefined(camera)) return;
      const xRatio: number = coords.x / width - 0.5;
      const yRatio: number = -(coords.y / height - 0.5);
      camera.drive.default.setX(xRatio * 5);
      camera.drive.default.setY(yRatio * 5);
    });
  }

  return { start, space };
}

function createCube(models3dService: TModels3dService, name: string, materialW: TMaterialWrapper): TModel3d {
  return models3dService.create({
    name,
    model3dSource: PrimitiveModel3dType.Cube,
    animationsSource: [],
    materialSource: materialW,
    options: { width: meters(1), height: meters(1), depth: meters(1) },
    position: new Vector3(),
    rotation: new Euler()
  });
}
