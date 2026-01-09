import type { TSceneWrapper, TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { spaceService } from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import GUI from 'lil-gui';
import type { Fog } from 'three';

import type { TAppSettings } from '@/Models';
import { addGizmo, enableFPSCounter, watchResourceLoading } from '@/Utils';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);
  watchResourceLoading(space);
  if (settings.loopsDebugInfo) enableFPSCounter(space.loops.renderLoop.tick$);

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
