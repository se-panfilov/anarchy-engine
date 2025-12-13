import { combineLatest, distinctUntilChanged, tap } from 'rxjs';
import type { Vector2Like, Vector3 } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TCameraWrapper, TEngine, TModel3d, TModel3dRegistry, TMouseService, TSceneWrapper, TScreenSizeValues, TSpace, TSpaceConfig } from '@/Engine';
import { ambientContext, Engine, getRotationByCos, getRotationBySin, isDefined, isNotDefined, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  const { models3dService, mouseService, scenesService } = space.services;
  const models3dRegistry: TModel3dRegistry = models3dService.getRegistry();

  function init(): void {
    const sceneW: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(sceneW)) throw new Error('Scene is not defined');

    const model3d: TModel3d | undefined = models3dRegistry.findByName('wood_cube_model');
    if (isNotDefined(model3d)) throw new Error('Model is not found');

    sceneW.addModel3d(model3d);

    initCameraRotation(space, model3d, mouseService);
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}

// This is mostly a copy of Showcase 3 (camera rotation)
function initCameraRotation(space: TSpace, model3d: TModel3d | undefined, mouseService: TMouseService): void {
  const { cameraService } = space.services;

  const camera: TCameraWrapper | undefined = cameraService.findActive();

  const { screenSizeWatcher } = ambientContext;
  const prevValue: Float32Array = new Float32Array([0, 0, 0, 0]); // [x, y, wight, height]
  combineLatest([mouseService.position$, screenSizeWatcher.value$])
    .pipe(
      distinctUntilChanged((_previous: [Vector2Like, TScreenSizeValues], [currPosition, currScreenSize]: [Vector2Like, TScreenSizeValues]): boolean => {
        return prevValue[0] === currPosition.x && prevValue[1] === currPosition.y && prevValue[2] === currScreenSize.width && prevValue[3] === currScreenSize.height;
      }),
      tap(([position, screenSize]: [Vector2Like, TScreenSizeValues]): void => {
        // eslint-disable-next-line functional/immutable-data
        prevValue[0] = position.x;
        // eslint-disable-next-line functional/immutable-data
        prevValue[1] = position.y;
        // eslint-disable-next-line functional/immutable-data
        prevValue[2] = screenSize.width;
        // eslint-disable-next-line functional/immutable-data
        prevValue[3] = screenSize.height;
      })
    )
    .subscribe(([coords, { width, height }]: [Vector2Like, TScreenSizeValues]): void => {
      if (isNotDefined(camera)) return;
      const xRatio: number = coords.x / width - 0.5;
      const yRatio: number = -(coords.y / height - 0.5);

      const xRotation: number = getRotationBySin(xRatio, 1, 2);
      const yRotation: number = getRotationByCos(xRatio, 1, 2);
      // camera.drive.default.setX(xRatio * 10);
      camera.drive.default.setX(xRotation);
      camera.drive.default.setY(yRatio * 10);
      camera.drive.default.setZ(yRotation);

      const vector: Vector3 | undefined = model3d?.getRawModel3d().position;
      if (isNotDefined(vector)) throw new Error('Model3d has no position');
      if (isDefined(model3d)) camera.lookAt(vector);
    });
}
