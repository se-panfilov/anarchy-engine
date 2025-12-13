import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TModel3dLoadOptions, TModel3dLoadResult, TSceneWrapper, TSpace, TSpaceConfig, TVector3Wrapper } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined, Vector3Wrapper } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { models3dService, scenesService } = space.services;
  const activeScene: TSceneWrapper | undefined = scenesService.findActive();

  async function init(activeScene: TSceneWrapper): Promise<void> {
    const scale: TVector3Wrapper = Vector3Wrapper({ x: 0.025, y: 0.025, z: 0.025 });
    const options: TModel3dLoadOptions = { shouldSaveToRegistry: true, shouldAddToScene: true, isForce: false };

    await Promise.all(
      models3dService.loadAsync([
        //gltf model
        { url: '/Showcase/models/fox/Fox.gltf', scale, position: Vector3Wrapper({ x: -5, y: 0, z: 0 }), options, tags: [] },
        //glb model (draco compressed)
        { url: '/Showcase/models/fox/Fox.glb', scale, position: Vector3Wrapper({ x: -5, y: 0, z: 0 }), options, tags: [] }
      ])
    ).then((result: ReadonlyArray<TModel3dLoadResult>) => {
      result.forEach((r: TModel3dLoadResult) => {
        activeScene.addModel(r.model);
      });
    });
  }

  function start(): void {
    engine.start();

    if (isNotDefined(activeScene)) throw new Error('Active scene not found');
    void init(activeScene);
  }

  return { start, space };
}
