import type { TFogWrapper, TSpace, TSpaceConfig } from '@hellpig/anarchy-engine';
import type { TWriteable } from '@hellpig/anarchy-shared/Utils';
import { BehaviorSubject } from 'rxjs';
import type { Fog } from 'three';
import { Color } from 'three';

import type { TSpacesData } from '../ShowcaseTypes';
import { addModel3dToScene, getContainer } from '../utils';
import spaceConfig from './spaceFog.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceFogData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace): void | never => {
    addModel3dToScene(space, 'surface_model');
  },
  onChange: (space: TSpace): void => {
    const fog: TFogWrapper = space.services.fogService.getRegistry().getByName('main_fog');
    // eslint-disable-next-line functional/immutable-data
    (fog.entity as TWriteable<Fog>).color = new Color('#FFFF00');
    // eslint-disable-next-line functional/immutable-data
    (fog.entity as TWriteable<Fog>).far = 150;
  }
};
