import { combineLatest } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapperAsync, IAppCanvas, ICameraWrapper, ILevel, ILevelConfig } from '@/Engine';
import { ambientContext, buildLevelFromConfig, getRotationByCos, getRotationBySin, isDefined, isNotDefined, mouseService } from '@/Engine';

import levelConfig from './showcase-9-textures-and-materials.config.json';

//Showcase 9: Textures & Materials
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  // Load texture dynamically
  // const pack: IBasicMaterialTexturePack = {
  //   map: { url: '/Showcase/Door_Wood/Door_Wood_001_basecolor.jpg' },
  //   material: MaterialType.Basic
  // };

  async function init(): Promise<void> {
    const { actorRegistry } = level.entities;
    const actor: IActorWrapperAsync | undefined = await actorRegistry.findByTagAsync('central_actor');
    if (isNotDefined(actor)) throw new Error('Actor is not found');

    //apply textures async, without blocking the main thread (game might be started before textures are loaded)
    // void actor.loadAndApplyMaterialTexturePack(pack);
    initCameraRotation(level, actor);
  }

  function start(): void {
    level.start();
    void init();
  }

  return { start, level };
}

// This is mostly a copy of Showcase 3 (camera rotation)
function initCameraRotation(level: ILevel, actor: IActorWrapperAsync | undefined): void {
  const { cameraRegistry } = level.entities;

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

    if (isDefined(actor)) camera.lookAt(actor.getPosition());
  });
}
