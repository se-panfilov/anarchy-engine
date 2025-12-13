import { combineLatest } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapperAsync, IAppCanvas, ICameraWrapper, ISpace, ISpaceConfig } from '@/Engine';
import { ambientContext, buildSpaceFromConfig, getRotationByCos, getRotationBySin, isDefined, isNotDefined, mouseService } from '@/Engine';

import spaceConfig from './showcase-9-textures-and-materials.config.json';

//Showcase 9: Textures & Materials
export function showcase(canvas: IAppCanvas): IShowcase {
  const space: ISpace = buildSpaceFromConfig(canvas, spaceConfig as ISpaceConfig);

  // Load texture dynamically
  // const pack: IBasicMaterialTexturePack = {
  //   map: { url: '/Showcase/Door_Wood/Door_Wood_001_basecolor.jpg' },
  //   material: MaterialType.Basic
  // };

  async function init(): Promise<void> {
    const { actorRegistry } = space.registries;
    const actor: IActorWrapperAsync | undefined = await actorRegistry.findByTagAsync('central_actor');
    if (isNotDefined(actor)) throw new Error('Actor is not found');

    //apply textures async, without blocking the main thread (game might be started before textures are loaded)
    // void actor.loadAndApplyMaterialTexturePack(pack);
    initCameraRotation(space, actor);
  }

  function start(): void {
    space.start();
    void init();
  }

  return { start, space };
}

// This is mostly a copy of Showcase 3 (camera rotation)
function initCameraRotation(space: ISpace, actor: IActorWrapperAsync | undefined): void {
  const { cameraService } = space.services;

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

    if (isDefined(actor)) camera.lookAt(actor.getPosition());
  });
}
