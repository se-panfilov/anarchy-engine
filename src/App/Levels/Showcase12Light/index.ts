import GUI from 'lil-gui';

import type { IShowcase } from '@/App/Levels/Models';
import type { IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { buildLevelFromConfig } from '@/Engine';

import levelConfig from './showcase-12-light.json';

//Showcase 12: Light
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const gui: GUI = new GUI();
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { actorRegistry } = level.entities;

  async function init(): Promise<void> {
    // gui.add(coordsUI, 'x').listen();
  }

  function start(): void {
    level.start();
    void init();
  }

  return { start, level };
}
