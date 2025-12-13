import { combineLatest } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorParams, IAppCanvas, ICameraWrapper, ILevel, ILevelConfig } from '@/Engine';
import { ActorType, ambientContext, buildLevelFromConfig, CameraTag, EulerWrapper, isDefined, isNotDefined, Vector3Wrapper } from '@/Engine';

import levelConfig from './showcase-level-3.config.json';

//Showcase 3:
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
      camera.setX(xRatio * 3);
      camera.setY(yRatio * 3);

      const actor = actorRegistry.getUniqByTag('central_actor');
      if (isDefined(actor)) camera.lookAt(actor.getPosition());
    });
  }

  return { start, level };
}
