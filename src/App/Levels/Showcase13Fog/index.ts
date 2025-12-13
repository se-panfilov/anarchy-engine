import GUI from 'lil-gui';

import type { IShowcase } from '@/App/Levels/Models';
import type { buildLevelFromConfig, IAppCanvas, ILevel, ILevelConfig, ISceneWrapper, isNotDefined, RendererTag } from '@/Engine';

import levelConfig from './showcase-13-fog.json';

//Showcase 13: Fog
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const gui: GUI = new GUI();
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { scenesRegistry, rendererRegistry } = level.entities;

  function init(): void {
    const scene: ISceneWrapper | undefined = scenesRegistry.findByTag('current');
    if (isNotDefined(scene)) throw new Error('Scene not found');
    if (isNotDefined(scene.entity.fog)) throw new Error("Scene's fog not found");

    rendererRegistry.findByTag(RendererTag.Main)?.entity.setClearColor(scene.entity.fog.color);

    // Create fog via service
    // FogService().createFog({ color: ColorWrapper('#00ff00').entity, near: 1, far: 100, tags: [] });

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
