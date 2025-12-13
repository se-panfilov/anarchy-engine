import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TModel3dLoadOptions, TModel3dLoadResult, TPerformLoadResult, TSpace, TSpaceConfig, TVector3Wrapper } from '@/Engine';
import { buildSpaceFromConfig, Engine, Vector3Wrapper } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { models3dService } = space.services;

  async function init(): Promise<void> {
    const scale: TVector3Wrapper = Vector3Wrapper({ x: 0.025, y: 0.025, z: 0.025 });
    const options: TModel3dLoadOptions = { shouldSaveToRegistry: true, shouldAddToScene: true, isForce: false };
    const runAnimation = undefined;

    await Promise.all(
      models3dService.loadAsync([
        //gltf model
        { url: '/Showcase/models/fox/Fox.gltf', scale, position: Vector3Wrapper({ x: -5, y: 0, z: 0 }), options, tags: [] }
        //glb model (draco compressed), won't be loaded, cause already loaded from json config
        // { url: '/Showcase/models/fox/Fox.glb', scale, position: Vector3Wrapper({ x: 0, y: 0, z: 0 }), options, tags: [] }
      ])
    ).then((result: ReadonlyArray<TModel3dLoadResult>) => {
      console.log('Model loaded', result);
    });

    // models3dService.added$.subscribe(({ result }: TPerformLoadResult): void => {
    //   const { animations } = result;
    //   runAnimation = animations.find((a) => a.name === 'Run');
    //   console.log('111', runAnimation);
    //   // runAnimation.loop = true;
    //   runAnimation.play();
    // });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
