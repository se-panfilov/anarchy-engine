import GUI from 'lil-gui';

import type { IShowcase } from '@/App/Levels/Models';
import type { IAppCanvas, ILevel, ILevelConfig, ISceneWrapper } from '@/Engine';
import { buildLevelFromConfig, isNotDefined } from '@/Engine';

import levelConfig from './showcase-13-fog.json';

//Showcase 13: Fog
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const gui: GUI = new GUI();
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { scenesRegistry } = level.entities;

  function init(): void {
    const scene: ISceneWrapper | undefined = scenesRegistry.getUniqByTag('current');
    if (isNotDefined(scene)) throw new Error('Scene not found');

    gui.addColor(scene.entity.fog, 'color');
    gui.add(scene.entity.fog, 'near').min(0).max(1).step(0.1);
    gui.add(scene.entity.fog, 'far').min(0).max(100).step(1);
  }

  function start(): void {
    level.start();
    void init();
  }

  return { start, level };
}
