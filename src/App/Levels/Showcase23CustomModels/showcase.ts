import type { AnimationClip } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TModel3dAnimations, TModel3dLoadOptions, TSpace, TSpaceConfig, TVector3Wrapper } from '@/Engine';
import { buildSpaceFromConfig, Engine, Vector3Wrapper } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { animationsService, models3dService } = space.services;

  async function init(): Promise<void> {
    const scale: TVector3Wrapper = Vector3Wrapper({ x: 0.025, y: 0.025, z: 0.025 });
    const options: TModel3dLoadOptions = { shouldAddToRegistry: true, shouldAddToScene: true, isForce: false };
    const urlGLTF: string = '/Showcase/models/fox/Fox.gltf';
    const urlGLB: string = '/Showcase/models/fox/Fox.glb';
    let runAnimationGLTF: AnimationClip | undefined = undefined;
    let runAnimationGLB: AnimationClip | undefined = undefined;

    animationsService.added$.subscribe(({ url, pack }: TModel3dAnimations): void => {
      if (url === urlGLTF) runAnimationGLTF = pack['Run'];
      if (url === urlGLB) runAnimationGLB = pack['Run'];
    });

    await Promise.all(
      models3dService.loadAsync([
        //gltf model
        { url: urlGLTF, scale, position: Vector3Wrapper({ x: -5, y: 0, z: 0 }), options, tags: [] }
        //glb model (draco compressed), won't be loaded, cause already loaded from json config
        // { url: urlGLB, scale, position: Vector3Wrapper({ x: 0, y: 0, z: 0 }), options, tags: [] }
      ])
    );
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
