import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TModel3dLoadOptions, TSpace, TSpaceConfig, TVector3Wrapper } from '@/Engine';
import { buildSpaceFromConfig, Engine, Vector3Wrapper } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
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
