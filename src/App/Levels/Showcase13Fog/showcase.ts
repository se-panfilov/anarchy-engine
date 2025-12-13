import GUI from 'lil-gui';
import type { Fog } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo } from '@/App/Levels/Utils';
import type { TEngine, TSceneWrapper, TSpace, TSpaceConfig } from '@/Engine';
import { ambientContext, Engine, isNotDefined, spaceService } from '@/Engine';

import spaceConfigJson from './showcase.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function showcase(): TShowcase {
  const gui: GUI = new GUI();
  const spaces: ReadonlyArray<TSpace> = spaceService.createFromConfig([spaceConfig]);
  // TODO 14-0-0: implement spaceService.findActive()
  const space: TSpace = spaces[0];
  const engine: TEngine = Engine(space);
  const { rendererService, scenesService } = space.services;

  function init(): void {
    const scene: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(scene)) throw new Error('Scene not found');
    if (isNotDefined(scene.entity.fog)) throw new Error("Scene's fog not found");

    addGizmo(space.services, ambientContext.screenSizeWatcher, space.loops, { placement: 'bottom-left' });

    rendererService.findActive()?.entity.setClearColor(scene.entity.fog.color);

    // Create fog via service
    // FogService().create({ color: ColorWrapper('#00ff00').entity, near: 1, far: 100 });

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
