import { combineLatest, distinctUntilChanged, tap } from 'rxjs';
import type { Vector2Like, Vector3 } from 'three';

import type { TAnyCameraWrapper, TModel3d, TModels3dRegistry, TMouseService, TSceneWrapper, TSpace, TSpaceConfig } from '@/Engine';
import { asRecord, getRotationByCos, getRotationBySin, isDefined, isNotDefined, spaceService } from '@/Engine';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig]));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const { models3dService, mouseService, scenesService } = space.services;
  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();
  const sceneW: TSceneWrapper = scenesService.getActive();

  const model3d: TModel3d = models3dRegistry.getByName('wood_cube_model');

  sceneW.addModel3d(model3d);

  initCameraRotation(space, model3d, mouseService);

  space.start$.next(true);
}

// This is mostly a copy of Showcase 3 (camera rotation)
function initCameraRotation(space: TSpace, model3d: TModel3d | undefined, mouseService: TMouseService): void {
  const { cameraService } = space.services;

  const camera: TAnyCameraWrapper = cameraService.getActive();

  const prevValue: Float32Array = new Float32Array([0, 0, 0, 0]); // [x, y, wight, height]
  combineLatest([mouseService.position$, space.container.viewportRect$])
    .pipe(
      distinctUntilChanged((prev: [Vector2Like, DOMRect], curr: [Vector2Like, DOMRect]): boolean => {
        const prevVector: Vector2Like = prev[0];
        const currVector: Vector2Like = curr[0];
        return prevVector.x === currVector.x && prevVector.y === currVector.y;
      }),
      tap(([position, screenSize]: [Vector2Like, DOMRect]): void => {
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
    .subscribe(([coords, { width, height }]: [Vector2Like, DOMRect]): void => {
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
