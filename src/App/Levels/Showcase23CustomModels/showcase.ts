import type { AnimationAction, AnimationMixer } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TAnimationActions, TAppCanvas, TEngine, TModel3dFacade, TModel3dLoadOptions, TSpace, TSpaceConfig, TVector3Wrapper } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined, KeyCode, Vector3Wrapper } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const { models3dService, loopService } = space.services;

  async function init(): Promise<void> {
    const scale: TVector3Wrapper = Vector3Wrapper({ x: 0.025, y: 0.025, z: 0.025 });
    const options: TModel3dLoadOptions = { shouldAddToRegistry: true, shouldAddToScene: true, isForce: false };
    const urlGLTF: string = '/Showcase/models/fox/Fox.gltf';
    const urlGLB: string = '/Showcase/models/fox/Fox.glb';

    //origin gltf model
    let runActionGltf: AnimationAction | undefined = undefined;
    const nameGltf: string = 'fox_gltf_original';
    let mixerGltf: AnimationMixer | undefined = undefined;

    //original glb model
    let runActionGlb: AnimationAction | undefined = undefined;
    let mixerGLB: AnimationMixer | undefined = undefined;

    //cloned gltf model
    let runActionGltfClone: AnimationAction | undefined = undefined;
    const nameGltfClone: string = 'fox_gltf_clone';
    let mixerGltfClone: AnimationMixer | undefined = undefined;

    //created from pack gltf model
    let runActionGltfClonePack: AnimationAction | undefined = undefined;
    const nameGltfClonePack: string = 'fox_gltf_clone_pack';
    let mixerGltfClonePack: AnimationMixer | undefined = undefined;

    models3dService.added$.subscribe((facade: TModel3dFacade): void => {
      const actions: TAnimationActions = facade.getActions();
      if (facade.getUrl() === urlGLTF && facade.getName() === nameGltf) {
        runActionGltf = actions['Run'];
        mixerGltf = facade.getMixer();
      }

      if (facade.getUrl() === urlGLB) {
        runActionGlb = actions['Run'];
        mixerGLB = facade.getMixer();
      }

      if (facade.getUrl() === urlGLTF && facade.getName() === nameGltfClone) {
        runActionGltfClone = actions['Run'];
        mixerGltfClone = facade.getMixer();
      }

      if (facade.getUrl() === urlGLTF && facade.getName() === nameGltfClonePack) {
        runActionGltfClonePack = actions['Run'];
        mixerGltfClonePack = facade.getMixer();
      }
    });

    const modelsList: ReadonlyArray<TModel3dFacade> = await Promise.all(
      models3dService.loadAsync([
        //gltf model
        { url: urlGLTF, name: nameGltf, scale, position: Vector3Wrapper({ x: -10, y: 0, z: 0 }), options, tags: [] }
        //glb model (draco compressed), won't be loaded, cause already loaded from json config
        // { url: urlGLB, scale, position: Vector3Wrapper({ x: 0, y: 0, z: 0 }), options, tags: [] }
      ])
    );

    const foxGltfOriginal: TModel3dFacade | undefined = modelsList.find((model: TModel3dFacade): boolean => model.getName() === nameGltf);
    if (isNotDefined(foxGltfOriginal)) throw new Error(`Fox GLTF("${nameGltf}") model is not defined`);

    //could be cloned from original model
    models3dService.clone(foxGltfOriginal, {
      name: nameGltfClone,
      position: Vector3Wrapper({ x: 0, y: 0, z: 0 })
    });

    //or could be created from pack
    models3dService.createFromPack({
      ...foxGltfOriginal.getPack(),
      name: nameGltfClonePack,
      position: Vector3Wrapper({ x: 5, y: 0, z: 0 })
    });

    // TODO (S.Panfilov) CWP make animation play via service, so we don't need loop and tick everywhere
    keyboardService.onKey(KeyCode.One).pressed$.subscribe((): void => void runActionGltf?.play());
    keyboardService.onKey(KeyCode.One).released$.subscribe((): void => void runActionGltf?.stop());
    keyboardService.onKey(KeyCode.Two).pressed$.subscribe((): void => void runActionGlb?.play());
    keyboardService.onKey(KeyCode.Two).released$.subscribe((): void => void runActionGlb?.stop());
    keyboardService.onKey(KeyCode.Three).pressed$.subscribe((): void => void runActionGltfClone?.play());
    keyboardService.onKey(KeyCode.Three).released$.subscribe((): void => void runActionGltfClone?.stop());
    keyboardService.onKey(KeyCode.Four).pressed$.subscribe((): void => void runActionGltfClonePack?.play());
    keyboardService.onKey(KeyCode.Four).released$.subscribe((): void => void runActionGltfClonePack?.stop());

    loopService.tick$.subscribe(({ delta }) => {
      if (runActionGltf && mixerGltf) mixerGltf.update(delta);
      if (runActionGlb && mixerGLB) mixerGLB.update(delta);
      if (runActionGltfClone && mixerGltfClone) mixerGltfClone.update(delta);
      if (runActionGltfClonePack && mixerGltfClonePack) mixerGltfClonePack.update(delta);
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
