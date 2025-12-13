import GUI from 'lil-gui';
import type { Fog } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TSceneWrapper, TSpace, TSpaceConfig } from '@/Engine';
import { Engine, isNotDefined, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const gui: GUI = new GUI();
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { rendererService, scenesService } = space.services;

  function init(): void {
    const scene: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(scene)) throw new Error('Scene not found');
    if (isNotDefined(scene.entity.fog)) throw new Error("Scene's fog not found");

    rendererService.findActive()?.entity.setClearColor(scene.entity.fog.color);

    // Create fog via service
    // FogService().create({ color: ColorWrapper('#00ff00').entity, near: 1, far: 100, tags: [] });

    gui.addColor(scene.entity.fog, 'color');
    gui
      .add(scene.entity.fog as Fog, 'near')
      .min(0)
      .max(1)
      .step(0.1);
    gui
      .add(scene.entity.fog as Fog, 'far')
      .min(0)
      .max(100)
      .step(1);
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
