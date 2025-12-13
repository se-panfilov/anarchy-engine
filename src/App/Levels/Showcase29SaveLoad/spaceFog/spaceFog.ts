import { BehaviorSubject } from 'rxjs';

import type { TSpace, TSpaceConfig } from '@/Engine';

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
  onChange: (space: TSpace): void => {}
};
