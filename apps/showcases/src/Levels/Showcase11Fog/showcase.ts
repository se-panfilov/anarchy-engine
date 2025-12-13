import GUI from 'lil-gui';
import type { Fog } from 'three';

import { addGizmo } from '@/Levels/Utils';
import type { TSceneWrapper, TSpace, TSpaceConfig } from '@Engine';
import { asRecord, isNotDefined, spaceService } from '@Engine';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig]));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const gui: GUI = new GUI();

  const { rendererService, scenesService } = space.services;

  const sceneW: TSceneWrapper = scenesService.getActive();
  if (isNotDefined(sceneW.entity.fog)) throw new Error("Scene's fog not found");

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  rendererService.getActive().entity.setClearColor(sceneW.entity.fog.color);

  // Create fog via service
  // FogService().create({ color: ColorWrapper('#00FF00').entity, near: 1, far: 100 });

  gui.addColor(sceneW.entity.fog, 'color');
  gui
    .add(sceneW.entity.fog as Fog, 'near')
    .min(0)
    .max(1)
    .step(0.1);
  gui
    .add(sceneW.entity.fog as Fog, 'far')
    .min(0)
    .max(100)
    .step(1);

  space.start$.next(true);
}
