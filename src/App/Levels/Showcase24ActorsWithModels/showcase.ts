import type { TShowcase } from '@/App/Levels/Models';
import type { TActorWrapperAsync, TAppCanvas, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { models3dService } = space.services;

  async function init(): Promise<void> {
    // TODO
  }

  // TODO debug light
  // const dirLightW: TDirectionalLightWrapper = lightService.getRegistry().findByName('dir_light') as unknown as TDirectionalLightWrapper;
  // scenesService.findActive()?.entity.add(new CameraHelper(dirLightW.entity.shadow.camera));

  // TODO debug camera coors
  // setInterval(() => {
  //   console.log(cameraService.findActive()?.getPosition().getCoords());
  // }, 3000);

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
