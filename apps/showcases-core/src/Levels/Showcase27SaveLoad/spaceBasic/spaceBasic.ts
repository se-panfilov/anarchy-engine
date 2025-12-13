import type { TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { BehaviorSubject } from 'rxjs';

import type { TSpacesData } from '../ShowcaseTypes';
import { addModel3dToScene, getContainer } from '../utils';
import spaceConfig from './spaceBasic.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceBasicData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace): void | never => {
    addModel3dToScene(space, 'surface_model');
  },
  onChange: (space: TSpace): void => {
    space.services.actorService.getRegistry().getByName('sphere_actor').drive.default.setX(10);
  }
};
