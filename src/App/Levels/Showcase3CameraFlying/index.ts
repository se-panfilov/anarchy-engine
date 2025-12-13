import { combineLatest } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorAsyncRegistry, IActorWrapperAsync, IAppCanvas, ICameraWrapper, ISpace, ISpaceConfig } from '@/Engine';
import { ambientContext, buildSpaceFromConfig, getRotationByCos, getRotationBySin, isNotDefined, mouseService } from '@/Engine';

import spaceConfig from './showcase-3-camera-flying.config.json';

//Showcase 3: Camera flying around the central actor
export function showcase(canvas: IAppCanvas): IShowcase {
  const space: ISpace = buildSpaceFromConfig(canvas, spaceConfig as ISpaceConfig);

  function start(): void {
    space.start();
    const { actorService, cameraService } = space.services;
    const actorRegistry: IActorAsyncRegistry = actorService.getRegistry();

    const camera: ICameraWrapper | undefined = cameraService.findActive();

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

      void actorRegistry.findByTagAsync('central_actor').then((actor: IActorWrapperAsync): void => {
        camera.lookAt(actor.getPosition());
      });
    });
  }

  return { start, space };
}
