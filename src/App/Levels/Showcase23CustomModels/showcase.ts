import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TModel3dFacade, TSpace, TSpaceConfig, TWithCoordsXYZ } from '@/Engine';
import { Engine, isNotDefined, KeyCode, spaceService, Vector3Wrapper } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  console.log('Press keys 1..4 to play animations of related models');

  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const { animationsService, models3dService } = space.services;

  async function init(): Promise<void> {
    const scale: TWithCoordsXYZ = { x: 0.025, y: 0.025, z: 0.025 };
    const nameGltfOriginal: string = 'fox_gltf_original';
    const nameGltfClone1: string = 'fox_gltf_clone_1';
    const nameGltfClone2: string = 'fox_gltf_clone_from_pack_2';
    const nameGlb: string = 'fox_glb_config_original';

    //gltf model
    await models3dService.loadAsync({ name: nameGltfOriginal, url: '/Showcase/Models/Fox/Fox.gltf', options: { scale, position: { x: -10, y: 0, z: 0 } } });
    //glb model (draco compressed), won't be loaded, cause already loaded from json config
    // await models3dService.loadAsync({ name: nameGlb, url: '/Showcase/Models/Fox/Fox.glb', options: { scale, position: { x: 0, y: 0, z: 0 } }});

    const foxGltfOriginal: TModel3dFacade | undefined = models3dService.getRegistry().findByName(nameGltfOriginal);
    if (isNotDefined(foxGltfOriginal)) throw new Error(`Model "${nameGltfOriginal}" model is not defined`);

    //could be cloned from original model
    models3dService.clone(foxGltfOriginal, { name: nameGltfClone1, position: Vector3Wrapper({ x: -5, y: 0, z: 0 }) });

    //or could be created from pack
    models3dService.createFromPack({ ...foxGltfOriginal.getPack(), name: nameGltfClone2, position: Vector3Wrapper({ x: 0, y: 0, z: 0 }) });

    const foxGltfClone1: TModel3dFacade | undefined = models3dService.getRegistry().findByName(nameGltfClone1);
    if (isNotDefined(foxGltfClone1)) throw new Error(`Model "${foxGltfClone1}" model is not defined`);

    const foxGltfClone2: TModel3dFacade | undefined = models3dService.getRegistry().findByName(nameGltfClone2);
    if (isNotDefined(foxGltfClone2)) throw new Error(`Model "${foxGltfClone2}" model is not defined`);

    const foxGlbOriginal2: TModel3dFacade | undefined = models3dService.getRegistry().findByName(nameGlb);
    if (isNotDefined(foxGlbOriginal2)) throw new Error(`Model "${foxGlbOriginal2}" model is not defined`);

    const runActionGltf = animationsService.startAutoUpdateMixer(foxGltfOriginal).actions['Run'];
    const runActionGltfClone1 = animationsService.startAutoUpdateMixer(foxGltfClone1).actions['Run'];
    const runActionGltfClone2 = animationsService.startAutoUpdateMixer(foxGltfClone2).actions['Run'];
    const runActionGlbOriginal2 = animationsService.startAutoUpdateMixer(foxGlbOriginal2).actions['Run'];

    keyboardService.onKey(KeyCode.One).pressed$.subscribe((): void => void runActionGltf?.play());
    keyboardService.onKey(KeyCode.One).released$.subscribe((): void => void runActionGltf?.stop());
    keyboardService.onKey(KeyCode.Two).pressed$.subscribe((): void => void runActionGltfClone1?.play());
    keyboardService.onKey(KeyCode.Two).released$.subscribe((): void => void runActionGltfClone1?.stop());
    keyboardService.onKey(KeyCode.Three).pressed$.subscribe((): void => void runActionGltfClone2?.play());
    keyboardService.onKey(KeyCode.Three).released$.subscribe((): void => void runActionGltfClone2?.stop());
    keyboardService.onKey(KeyCode.Four).pressed$.subscribe((): void => void runActionGlbOriginal2?.play());
    keyboardService.onKey(KeyCode.Four).released$.subscribe((): void => void runActionGlbOriginal2?.stop());
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
