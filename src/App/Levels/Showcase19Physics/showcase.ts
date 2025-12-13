import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { loopService } = engine.services;
  // const { particlesService } = space.services;

  loopService.tick$.subscribe(({ delta }) => {});

  async function init(): Promise<void> {
    // TODO (S.Panfilov)
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
