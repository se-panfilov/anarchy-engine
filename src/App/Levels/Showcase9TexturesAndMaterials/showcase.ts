import { combineLatest } from 'rxjs';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActorRegistry, TActorWrapper, TAppCanvas, TCameraWrapper, TEngine, TMouseService, TSpace, TSpaceConfig } from '@/Engine';
import { ambientContext, buildSpaceFromConfig, Engine, getRotationByCos, getRotationBySin, isDefined, isNotDefined } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  // Load texture dynamically
  // const pack: IBasicMaterialTexturePack = {
  //   map: { url: '/Showcase/Door_Wood/Door_Wood_001_basecolor.jpg' },
  //   material: MaterialType.Basic
  // };

  function init(): void {
    const { actorService, mouseService } = space.services;
    const actorRegistry: TActorRegistry = actorService.getRegistry();
    const actor: TActorWrapper | undefined = actorRegistry.findByTag('central_actor');
    if (isNotDefined(actor)) throw new Error('Actor is not found');

    //apply textures async, without blocking the main thread (game might be started before textures are loaded)
    // void actor.loadAndApplyMaterialTexturePack(pack);
    initCameraRotation(space, actor, mouseService);
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}

// This is mostly a copy of Showcase 3 (camera rotation)
function initCameraRotation(space: TSpace, actor: TActorWrapper | undefined, mouseService: TMouseService): void {
  const { cameraService } = space.services;

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

    if (isDefined(actor)) camera.lookAt(actor.getPosition());
  });
}
