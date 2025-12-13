import type { IShowcase } from '@/App/Levels/Models';
import type { IAppCanvas, IEngine, ISpace, ISpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: IAppCanvas): IShowcase {
  const space: ISpace = buildSpaceFromConfig(canvas, spaceConfig as ISpaceConfig);
  const engine: IEngine = Engine(space);

  async function init(): Promise<void> {
    // TODO (S.Panfilov)
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
