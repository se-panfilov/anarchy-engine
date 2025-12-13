import type { AnimationAction, AnimationMixer } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TAnimationActions, TAppCanvas, TEngine, TModel3dFacade, TModel3dLoadOptions, TSpace, TSpaceConfig, TVector3Wrapper } from '@/Engine';
import { buildSpaceFromConfig, Engine, KeyCode, Vector3Wrapper } from '@/Engine';

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
    let runAnimationGLTF: AnimationAction | undefined = undefined;
    let mixerGLTF: AnimationMixer | undefined = undefined;
    let runAnimationGLB: AnimationAction | undefined = undefined;

    models3dService.added$.subscribe((facade: TModel3dFacade): void => {
      const actions: TAnimationActions = facade.getActions();
      if (facade.getUrl() === urlGLTF) {
        runAnimationGLTF = actions['Run'];
        mixerGLTF = facade.getMixer();
      }
      if (facade.getUrl() === urlGLB) runAnimationGLB = actions['Run'];
    });

    await Promise.all(
      models3dService.loadAsync([
        //gltf model
        { url: urlGLTF, scale, position: Vector3Wrapper({ x: -5, y: 0, z: 0 }), options, tags: [] }
        //glb model (draco compressed), won't be loaded, cause already loaded from json config
        // { url: urlGLB, scale, position: Vector3Wrapper({ x: 0, y: 0, z: 0 }), options, tags: [] }
      ])
    );

    keyboardService.onKey(KeyCode.W).pressed$.subscribe((): void => {
      // TODO (S.Panfilov) CWP make animation play via service, so we don't need loop and tick everywhere
      if (runAnimationGLTF) runAnimationGLTF.play();
      // if (runAnimationGLB) runAnimationGLB.reset().play();
    });

    loopService.tick$.subscribe(({ delta }) => {
      if (runAnimationGLTF && mixerGLTF) mixerGLTF.update(delta);
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
