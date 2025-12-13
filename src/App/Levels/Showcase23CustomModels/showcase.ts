import type { TShowcase } from '@/App/Levels/Models';
import type { TActorAsyncRegistry, TAppCanvas, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  const { actorService, loopService } = space.services;
  const actorRegistry: TActorAsyncRegistry = actorService.getRegistry();

  function init(): void {
    console.log('Ready');
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
