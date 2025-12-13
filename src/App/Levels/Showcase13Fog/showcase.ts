import GUI from 'lil-gui';
import type { Fog } from 'three';

import { addGizmo } from '@/App/Levels/Utils';
import type { TSceneWrapper, TSpace, TSpaceConfig } from '@/Engine';
import { ambientContext, isNotDefined, spaceService } from '@/Engine';

import spaceConfigJson from './showcase.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(): void {
  const spaces: ReadonlyArray<TSpace> = spaceService.createFromConfig([spaceConfig]);
  // TODO 14-0-0: implement spaceService.findActive()
  const space: TSpace = spaces[0];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const gui: GUI = new GUI();

  const { rendererService, scenesService } = space.services;

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

  space.start$.next(true);
}
