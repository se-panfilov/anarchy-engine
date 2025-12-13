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
    const models3dLoadOptions: TModel3dLoadOptions = { shouldSaveToRegistry: true, shouldAddToScene: true };
    const isForce: boolean = false;
    const scale: number = 0.025;

    await models3dService.loadAsync({ url: '/Showcase/models/fox/Fox.gltf' }, models3dLoadOptions, isForce).then((result: TModel3dLoadResult) => {
      result.model.scale.set(scale, scale, scale);
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
