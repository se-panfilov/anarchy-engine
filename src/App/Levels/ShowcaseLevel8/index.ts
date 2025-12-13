import { combineLatest } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapper, IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { ambientContext, buildLevelFromConfig, CameraTag, getRotationByCos, getRotationBySin, isDefined, isNotDefined } from '@/Engine';

import levelConfig from './showcase-level-8.config.json';

//Showcase 8: Textures
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  function start(): void {
    level.start();
    const { actorRegistry } = level.entities;
    const actor = actorRegistry.getUniqByTag('central_actor');
    initCameraRotation(level, actor);
  }

  return { start, level };
}

// This is mostly a copy of Showcase 3 (camera rotation)
function initCameraRotation(level: ILevel, actor: IActorWrapper | undefined): void {
  const { cameraRegistry } = level.entities;

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

    if (isDefined(actor)) camera.lookAt(actor.getPosition());
  });
}
