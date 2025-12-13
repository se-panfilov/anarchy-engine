import type { IShowcase } from '@/App/Levels/Models';
import type { IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { buildLevelFromConfig } from '@/Engine';

import levelConfig from './showcase-level-7.config.json';

//Showcase 7: Fancy text
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { textFactory, textRegistry } = level.entities;

  function start(): void {
    level.start();
  }

  return { start, level };
}
