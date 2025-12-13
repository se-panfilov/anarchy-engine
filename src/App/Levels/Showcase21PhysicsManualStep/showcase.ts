import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, KeysExtra } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const { loopService, physicsWorldService, physicsLoopService } = space.services;

  function init(): void {
    physicsWorldService.getDebugRenderer(loopService).start();

    keyboardService.onKey(KeysExtra.Space).pressed$.subscribe((): void => physicsLoopService.shouldAutoUpdate(true));
    keyboardService.onKey(KeysExtra.Space).released$.subscribe((): void => physicsLoopService.shouldAutoUpdate(false));
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
