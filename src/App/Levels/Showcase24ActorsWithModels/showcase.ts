import { CameraHelper } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TDirectionalLightWrapper, TEngine, TModel3dLoadOptions, TSpace, TSpaceConfig, TVector3Wrapper } from '@/Engine';
import { buildSpaceFromConfig, Engine, Vector3Wrapper } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { scenesService, models3dService, lightService } = space.services;

  async function init(): Promise<void> {
    const scale: TVector3Wrapper = Vector3Wrapper({ x: 1, y: 1, z: 1 });
    const options: TModel3dLoadOptions = { shouldAddToRegistry: true, shouldAddToScene: true, isForce: false };

    await Promise.all(models3dService.loadAsync([{ url: '/Showcase/Models/Solder/Solder.glb', name: 'actor_1', scale, position: Vector3Wrapper({ x: 0, y: 0, z: 0 }), options }]));
  }

  // TODO debug light
  const dirLightW: TDirectionalLightWrapper = lightService.getRegistry().findByName('dir_light') as unknown as TDirectionalLightWrapper;
  scenesService.findActive()?.entity.add(new CameraHelper(dirLightW.entity.shadow.camera));

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
