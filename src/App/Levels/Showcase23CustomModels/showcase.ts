import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TModel3dLoadResult, TSceneWrapper, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { models3dService, scenesService } = space.services;
  const activeScene: TSceneWrapper | undefined = scenesService.findActive();

  async function init(activeScene: TSceneWrapper): Promise<void> {
    await models3dService.loadAsync({ url: '/Showcase/models/fox/Fox.gltf' }, false).then((result: TModel3dLoadResult) => {
      result.model.scale.set(0.025, 0.025, 0.025);
      result.model.position.set(-10, 0, 0);
      activeScene.addModel(result.model);
    });
  }

  function start(): void {
    engine.start();

    if (isNotDefined(activeScene)) throw new Error('Active scene not found');
    void init(activeScene);
  }

  return { start, space };
}
