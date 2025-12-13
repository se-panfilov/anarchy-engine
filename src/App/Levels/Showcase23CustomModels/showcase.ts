import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TShowcase } from '@/App/Levels/Models';
import type {
  TAppCanvas,
  TEngine,
  TModel3dFacade,
  TModel3dRegistry,
  TModel3dResourceAsyncRegistry,
  TRegistryPack,
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TSpaceServices,
  TWithCoordsXYZ
} from '@/Engine';
import { Engine, isNotDefined, KeyCode, spaceService, Vector3Wrapper } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  console.log('Press keys 1..3 to play animations of related models');

  const scale: TWithCoordsXYZ = { x: 0.025, y: 0.025, z: 0.025 };
  const nameGltfOriginal: string = 'fox_gltf_original';
  const nameGltfClone1: string = 'fox_gltf_clone_1';
  const nameGlb: string = 'fox_glb_config_original';

  function beforeResourcesLoaded(config: TSpaceConfig, { models3dService, scenesService }: TSpaceServices): void {
    const models3dRegistry: TModel3dRegistry = models3dService.getRegistry();
    const models3dResourceRegistry: TModel3dResourceAsyncRegistry = models3dService.getResourceRegistry();
    const sceneW: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(sceneW)) throw new Error('Scene is not defined');

    //Adding models3d to the scene
    models3dResourceRegistry.added$.subscribe(({ key: name, value: model3dSource }: TRegistryPack<GLTF>): void => {
      console.log(`Model "${name}" is loaded`);
      const model3dF: TModel3dFacade = models3dService.create({ name, model3dSource });
      model3dF.getModel().scale.set(scale.x, scale.y, scale.z);
    });

    models3dRegistry.added$.subscribe(({ key: name, value: model3dSource }: TRegistryPack<TModel3dFacade>): void => {
      console.log(`Model "${name}" is created`);
      sceneW.addModel3d(model3dSource.getModel());
    });
  }

  // TODO would be nice to add a "beforeConfigLoaded()" hook
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig, { beforeResourcesLoaded });
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const { animationsService, models3dService, scenesService } = space.services;

  async function init(): Promise<void> {
    const sceneW: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(sceneW)) throw new Error('Scene is not defined');

    //gltf model
    await models3dService.loadAsync({ name: nameGltfOriginal, url: '/Showcase/Models/Fox/Fox.gltf' });

    //Let's clone the original model (which was loaded from the code)
    const foxGltfOriginal: TModel3dFacade | undefined = models3dService.getRegistry().findByName(nameGltfOriginal);
    if (isNotDefined(foxGltfOriginal)) throw new Error(`Model "${nameGltfOriginal}" doesn't exist in the registry`);
    models3dService.clone(foxGltfOriginal, { name: nameGltfClone1, position: Vector3Wrapper({ x: -5, y: 0, z: 0 }) });

    const foxGltfClone1: TModel3dFacade | undefined = models3dService.getRegistry().findByName(nameGltfClone1);
    if (isNotDefined(foxGltfClone1)) throw new Error(`Model "${foxGltfClone1}" model is not defined`);

    //Let's clone the original model (which was loaded from the json config)
    const foxGlbClone2: TModel3dFacade | undefined = models3dService.getRegistry().findByName(nameGlb);
    if (isNotDefined(foxGlbClone2)) throw new Error(`Model "${foxGlbClone2}" model is not defined`);

    const runActionGltf = animationsService.startAutoUpdateMixer(foxGltfOriginal).actions['Run'];
    const runActionGltfClone1 = animationsService.startAutoUpdateMixer(foxGltfClone1).actions['Run'];
    const runActionGltfClone2 = animationsService.startAutoUpdateMixer(foxGlbClone2).actions['Run'];

    keyboardService.onKey(KeyCode.One).pressed$.subscribe((): void => void runActionGltf?.play());
    keyboardService.onKey(KeyCode.One).released$.subscribe((): void => void runActionGltf?.stop());
    keyboardService.onKey(KeyCode.Two).pressed$.subscribe((): void => void runActionGltfClone1?.play());
    keyboardService.onKey(KeyCode.Two).released$.subscribe((): void => void runActionGltfClone1?.stop());
    keyboardService.onKey(KeyCode.Three).pressed$.subscribe((): void => void runActionGltfClone2?.play());
    keyboardService.onKey(KeyCode.Three).released$.subscribe((): void => void runActionGltfClone2?.stop());
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
