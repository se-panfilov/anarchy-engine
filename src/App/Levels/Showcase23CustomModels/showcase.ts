import type { TShowcase } from '@/App/Levels/Models';
import type { TActorAsyncRegistry, TAppCanvas, TEngine, TSceneWrapper, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { actorService, loopService, models3dService, scenesService } = space.services;
  const activeScene: TSceneWrapper | undefined = scenesService.findActive();

  const actorRegistry: TActorAsyncRegistry = actorService.getRegistry();

  async function init(activeScene: TSceneWrapper): Promise<void> {
    await models3dService.loadAsync({ url: '/Showcase/models/fox/Fox.gltf' }, false).then((mesh) => {
      mesh.scale.set(0.025, 0.025, 0.025);
      activeScene.addModel(mesh);
      console.log(mesh);
    });
  }

  function start(): void {
    engine.start();

    if (isNotDefined(activeScene)) throw new Error('Active scene not found');
    void init(activeScene);
  }

  return { start, space };
}
