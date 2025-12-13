import { combineLatest } from 'rxjs';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActorAsyncRegistry, TActorWrapperAsync, TAppCanvas, ICameraWrapper, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { ambientContext, buildSpaceFromConfig, Engine, getRotationByCos, getRotationBySin, isNotDefined, mouseService } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  function start(): void {
    engine.start();
    const { actorService, cameraService } = space.services;
    const actorRegistry: TActorAsyncRegistry = actorService.getRegistry();

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

      void actorRegistry.findByTagAsync('central_actor').then((actor: TActorWrapperAsync | undefined): void => {
        if (isNotDefined(actor)) throw new Error('Actor not found');
        camera.lookAt(actor.getPosition());
      });
    });
  }

  return { start, space };
}
