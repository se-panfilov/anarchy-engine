import type { AnimationAction } from 'three';
import { Euler, Vector3 } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TModel3d, TModel3dRegistry, TModel3dResourceAsyncRegistry, TRegistryPack, TSceneWrapper, TSpace, TSpaceConfig, TSpaceServices } from '@/Engine';
import { Engine, isNotDefined, KeyCode, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  console.log('Press keys 1..3 to play animations of related models');

  const originalName: string = 'fox_gltf_original';
  const cloneName: string = 'fox_gltf_clone_1';
  const originalCompressedName: string = 'fox_glb_config_original';

  function beforeResourcesLoaded(_config: TSpaceConfig, { models3dService, scenesService }: TSpaceServices): void {
    const models3dRegistry: TModel3dRegistry = models3dService.getRegistry();
    const models3dResourceRegistry: TModel3dResourceAsyncRegistry = models3dService.getResourceRegistry();
    const sceneW: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(sceneW)) throw new Error('Scene is not defined');

    //Adding models3d to the scene
    models3dResourceRegistry.added$.subscribe(({ key: name, value: model3dSource }: TRegistryPack<GLTF>): void => {
      console.log(`Model "${name}" is loaded`);

      //Preventing creating the same model twice (it's already created once config is loaded)
      if (name !== 'fox_glb') models3dService.create({ name, model3dSource, position: new Vector3(), rotation: new Euler() });
    });

    models3dRegistry.added$.subscribe(({ key, value: model3dSource }: TRegistryPack<TModel3d>): void => {
      console.log(`Model "${model3dSource.name}" is created (${key})`);
      sceneW.addModel3d(model3dSource.getModel3d());
    });
  }

  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig, { beforeResourcesLoaded });
  const engine: TEngine = Engine(space);

  async function init(): Promise<void> {
    const scale: Vector3 = new Vector3(0.025, 0.025, 0.025);
    const { keyboardService } = engine.services;
    const { animationsService, models3dService, scenesService } = space.services;
    const sceneW: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(sceneW)) throw new Error('Scene is not defined');

    //gltf model
    await models3dService.loadAsync({ name: originalName, url: '/Showcase/Models/Fox/Fox.gltf', options: { scale } });

    //Let's clone the original model (which was loaded from the code)
    const modelOriginal: TModel3d | undefined = models3dService.getRegistry().findByName(originalName);
    if (isNotDefined(modelOriginal)) throw new Error(`Model "${originalName}" doesn't exist in the registry`);
    models3dService.clone(modelOriginal, { name: cloneName, position: new Vector3(-5, 0, 0) });

    const modelClone: TModel3d | undefined = models3dService.getRegistry().findByName(cloneName);
    if (isNotDefined(modelClone)) throw new Error(`Model "${modelClone}" model is not defined`);

    const modelCompressed: TModel3d | undefined = models3dService.getRegistry().findByName(originalCompressedName);
    if (isNotDefined(modelCompressed)) throw new Error(`Model "${modelCompressed}" model is not defined`);

    const runActionOriginalModel: AnimationAction = animationsService.startAutoUpdateMixer(modelOriginal).actions['Run'];
    const runActionCloneModel: AnimationAction = animationsService.startAutoUpdateMixer(modelClone).actions['Run'];
    const runActionCompressedModel: AnimationAction = animationsService.startAutoUpdateMixer(modelCompressed).actions['Run'];

    keyboardService.onKey(KeyCode.One).pressed$.subscribe((): void => void runActionCloneModel?.play());
    keyboardService.onKey(KeyCode.One).released$.subscribe((): void => void runActionCloneModel?.stop());
    keyboardService.onKey(KeyCode.Two).pressed$.subscribe((): void => void runActionOriginalModel?.play());
    keyboardService.onKey(KeyCode.Two).released$.subscribe((): void => void runActionOriginalModel?.stop());
    keyboardService.onKey(KeyCode.Three).pressed$.subscribe((): void => void runActionCompressedModel?.play());
    keyboardService.onKey(KeyCode.Three).released$.subscribe((): void => void runActionCompressedModel?.stop());
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
