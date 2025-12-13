import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TModel3dFacade, TModel3dRegistry, TModel3dResourceAsyncRegistry, TRegistryPack, TSceneWrapper, TSpace, TSpaceConfig, TSpaceServices } from '@/Engine';
import { Engine, isNotDefined, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  function beforeResourcesLoaded(_config: TSpaceConfig, { models3dService, scenesService }: TSpaceServices): void {
    const models3dRegistry: TModel3dRegistry = models3dService.getRegistry();
    const models3dResourceRegistry: TModel3dResourceAsyncRegistry = models3dService.getResourceRegistry();
    const sceneW: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(sceneW)) throw new Error('Scene is not defined');

    //Adding models3d to the scene
    models3dResourceRegistry.added$.subscribe(({ key: name, value: model3dSource }: TRegistryPack<GLTF>): void => {
      console.log(`Model "${name}" is loaded`);
      models3dService.create({ name, model3dSource });
    });

    models3dRegistry.added$.subscribe(({ key: name, value: model3dSource }: TRegistryPack<TModel3dFacade>): void => {
      console.log(`Model "${name}" is created`, model3dSource.name);
      sceneW.addModel3d(model3dSource.getModel());
    });
  }

  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig, { beforeResourcesLoaded });
  const engine: TEngine = Engine(space);
  // const { actorService } = space.services;

  function init(): void {
    // const actorW: TActorWrapper = actorService.create(params);
  }

  // TODO debug light
  // const dirLightW: TDirectionalLightWrapper = lightService.getRegistry().findByName('dir_light') as unknown as TDirectionalLightWrapper;
  // scenesService.findActive()?.entity.add(new CameraHelper(dirLightW.entity.shadow.camera));

  // TODO debug camera coords
  // setInterval(() => {
  //   console.log(cameraService.findActive()?.getPosition().getCoords());
  // }, 3000);

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
