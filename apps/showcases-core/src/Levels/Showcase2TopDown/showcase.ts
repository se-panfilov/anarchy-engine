import type { TActorParams, TAnyCameraWrapper, TAnyMaterialWrapper, TModel3d, TModels3dService, TSpace, TSpaceConfig, TSpatialGridWrapper } from '@Anarchy/Engine';
import { CameraType, MaterialType, meters, PrimitiveModel3dType, spaceService } from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import { combineLatest, distinctUntilChanged } from 'rxjs';
import type { Vector2Like } from 'three';
import { Euler, Vector3 } from 'three';

import type { TAppSettings } from '@/Models';
import { enableFPSCounter, watchActiveRendererReady, watchResourceLoading } from '@/Utils';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);
  watchResourceLoading(space);
  if (settings.loopsDebugInfo) enableFPSCounter(space.loops.renderLoop.tick$);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  watchActiveRendererReady(space);
  const { actorService, spatialGridService, cameraService, materialService, models3dService, mouseService } = space.services;
  const grid: TSpatialGridWrapper = spatialGridService.getRegistry().getByName('main_grid');
  const materialW: TAnyMaterialWrapper = materialService.create({ name: 'model_material', type: MaterialType.Toon, options: { color: '#5177ff' } });

  const actorDefaultParams: Omit<TActorParams, 'model3dSource' | 'name'> = {
    position: new Vector3(),
    rotation: new Euler(),
    spatial: { grid, isAutoUpdate: false }
  };

  const actorParams1: TActorParams = {
    ...actorDefaultParams,
    name: 'actor_1',
    model3dSource: createCube(models3dService, 'cube1', materialW),
    position: new Vector3(2, 2, 0)
  };
  const actorParams2: TActorParams = {
    ...actorDefaultParams,
    name: 'actor_2',
    model3dSource: createCube(models3dService, 'cube2', materialW),
    position: new Vector3(-2, 0, 0)
  };
  const actorParams3: TActorParams = {
    ...actorDefaultParams,
    name: 'actor_3',
    model3dSource: createCube(models3dService, 'cube3', materialW),
    position: new Vector3(0, 1, 0)
  };
  const actorParams4: TActorParams = {
    ...actorDefaultParams,
    name: 'actor_4',
    model3dSource: createCube(models3dService, 'cube4', materialW),
    position: new Vector3(-2, 2, 0)
  };
  const actorParams5: TActorParams = {
    ...actorDefaultParams,
    name: 'actor_5',
    model3dSource: createCube(models3dService, 'cube5', materialW),
    position: new Vector3(2, 0, 0)
  };

  [actorParams1, actorParams2, actorParams3, actorParams4, actorParams5].forEach((actor: TActorParams) => actorService.create(actor));

  const camera: TAnyCameraWrapper = cameraService.create({
    name: 'camera',
    position: new Vector3(0, 0, 3),
    rotation: new Euler(),
    isActive: true,
    type: CameraType.Perspective
  });

  combineLatest([mouseService.position$, space.container.viewportRect$])
    .pipe(
      distinctUntilChanged((prev: [Vector2Like, DOMRect], curr: [Vector2Like, DOMRect]): boolean => {
        const prevVector: Vector2Like = prev[0];
        const currVector: Vector2Like = curr[0];
        return prevVector.x === currVector.x && prevVector.y === currVector.y;
      })
    )
    .subscribe(([coords, { width, height }]: [Vector2Like, DOMRect]): void => {
      if (isNotDefined(camera)) return;
      const xRatio: number = coords.x / width - 0.5;
      const yRatio: number = -(coords.y / height - 0.5);
      camera.drive.default.setX(xRatio * 5);
      camera.drive.default.setY(yRatio * 5);
    });

  space.start$.next(true);
}

function createCube(models3dService: TModels3dService, name: string, material: TAnyMaterialWrapper): TModel3d {
  return models3dService.create({
    name,
    model3dSource: PrimitiveModel3dType.Cube,
    animationsSource: [],
    material,
    options: { width: meters(1), height: meters(1), depth: meters(1) },
    position: new Vector3(),
    rotation: new Euler()
  });
}
