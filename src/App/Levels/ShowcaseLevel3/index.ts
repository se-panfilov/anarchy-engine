import { combineLatest } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import type { IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { ambientContext, buildLevelFromConfig, CameraTag, getRotationByCos, getRotationBySin, isDefined, isNotDefined } from '@/Engine';

import levelConfig from './showcase-level-3.config.json';

//Showcase 3: Camera flying around the central actor
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  function start(): void {
    level.start();
    const { actorRegistry, cameraRegistry } = level.entities;

    const camera = cameraRegistry.getUniqByTag(CameraTag.Active);

    const { mousePositionWatcher, screenSizeWatcher } = ambientContext;
    combineLatest([mousePositionWatcher.value$, screenSizeWatcher.latest$]).subscribe(([{ x, y }, { width, height }]): void => {
      if (isNotDefined(camera)) return;
      const xRatio: number = x / width - 0.5;
      const yRatio: number = -(y / height - 0.5);

      const xRotation: number = getRotationBySin(xRatio, 1, 2);
      const yRotation: number = getRotationByCos(xRatio, 1, 2);
      // camera.setX(xRatio * 10);
      camera.setX(xRotation);
      camera.setY(yRatio * 10);
      camera.setZ(yRotation);

      const actor = actorRegistry.getUniqByTag('central_actor');
      if (isDefined(actor)) camera.lookAt(actor.getPosition());
    });
  }

  return { start, level };
}
