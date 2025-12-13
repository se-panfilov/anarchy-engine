import type { TModel3d, TModels3dRegistry, TSceneWrapper, TSpace, TSpaceConfig, TText3dWrapper } from '@Engine';
import { asRecord, isNotDefined, spaceService } from '@Engine';

import type { TAppSettings } from '@/Models';
import { addGizmo } from '@/Utils';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`[Showcase]: Space "${spaceConfig.name}" is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const { models3dService, scenesService, textService } = space.services;
  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();
  const sceneW: TSceneWrapper = scenesService.getActive();

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  const planeModel3d: TModel3d = models3dRegistry.getByName('surface_model');

  const text3d: TText3dWrapper = textService.getRegistries().text3dRegistry.getByName('text_3d_1');

  sceneW.addModel3d(planeModel3d);
  sceneW.addText(text3d);

  space.start$.next(true);
}
