import { combineLatest } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapperAsync, IAppCanvas, ICameraWrapper, ILevel, ILevelConfig } from '@/Engine';
import { ambientContext, buildLevelFromConfig, getRotationByCos, getRotationBySin, isNotDefined, mouseService } from '@/Engine';

import levelConfig from './showcase-3-camera-flying.config.json';

//Showcase 3: Camera flying around the central actor
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  function start(): void {
    level.start();
    const { actorRegistry, cameraRegistry } = level.entities;

    const camera: ICameraWrapper | undefined = cameraRegistry.getActiveCamera();

    const { screenSizeWatcher } = ambientContext;
    combineLatest([mouseService.position$, screenSizeWatcher.latest$]).subscribe(([{ x, y }, { width, height }]): void => {
      if (isNotDefined(camera)) return;
      const xRatio: number = x / width - 0.5;
      const yRatio: number = -(y / height - 0.5);

      const xRotation: number = getRotationBySin(xRatio, 1, 2);
      const yRotation: number = getRotationByCos(xRatio, 1, 2);
      // camera.setX(xRatio * 10);
      camera.setX(xRotation);
      camera.setY(yRatio * 10);
      camera.setZ(yRotation);

      void actorRegistry.getUniqByTagAsync('central_actor').then((actor: IActorWrapperAsync): void => {
        camera.lookAt(actor.getPosition());
      });
    });
  }

  return { start, level };
}
