import { combineLatest } from 'rxjs';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActor, TActorRegistry, TAppCanvas, TCameraWrapper, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { ambientContext, Engine, getRotationByCos, getRotationBySin, isNotDefined, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  function start(): void {
    engine.start();
    const { actorService, cameraService, mouseService } = space.services;
    const actorRegistry: TActorRegistry = actorService.getRegistry();

    const camera: TCameraWrapper | undefined = cameraService.findActive();

    const { screenSizeWatcher } = ambientContext;
    combineLatest([mouseService.position$, screenSizeWatcher.latest$]).subscribe(([{ coords }, { width, height }]): void => {
      if (isNotDefined(camera)) return;
      const xRatio: number = coords.x / width - 0.5;
      const yRatio: number = -(coords.y / height - 0.5);

      const xRotation: number = getRotationBySin(xRatio, 1, 2);
      const yRotation: number = getRotationByCos(xRatio, 1, 2);
      // camera.setX(xRatio * 10);
      camera.setX(xRotation);
      camera.setY(yRatio * 10);
      camera.setZ(yRotation);

      const actor: TActor | undefined = actorRegistry.findByName('central_actor');
      if (isNotDefined(actor)) throw new Error('Actor not found');
      camera.lookAt(actor.position$.value);
    });
  }

  return { start, space };
}
