import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TModel3dLoadOptions, TModel3dLoadResult, TSceneWrapper, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { models3dService, scenesService } = space.services;
  const activeScene: TSceneWrapper | undefined = scenesService.findActive();

  async function init(activeScene: TSceneWrapper): Promise<void> {
    const options: TModel3dLoadOptions = { shouldSaveToRegistry: true, shouldAddToScene: true, isForce: false };
    const scale: number = 0.025;

    await Promise.all(
      models3dService.loadAsync([
        //gltf model
        { url: '/Showcase/models/fox/Fox.gltf', options },
        //glb model (draco compressed)
        { url: '/Showcase/models/fox/Fox.glb', options }
      ])
    ).then((result: ReadonlyArray<TModel3dLoadResult>) => {
      let step: number = -5;
      result.forEach((r: TModel3dLoadResult) => {
        r.model.scale.set(scale, scale, scale);
        r.model.position.set(step, 0, 0);
        step += 5;
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
