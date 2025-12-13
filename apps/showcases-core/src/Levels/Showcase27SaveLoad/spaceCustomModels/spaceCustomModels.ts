import type { TModel3d, TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { BehaviorSubject } from 'rxjs';

import type { TSpacesData } from '../ShowcaseTypes';
import { addModel3dToScene, getContainer } from '../utils';
import spaceConfig from './spaceCustomModels.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceCustomModelsData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace): void | never => {
    addModel3dToScene(space, 'fox_glb_config_original');
    addModel3dToScene(space, 'surface_model');
  },
  onChange: (space: TSpace): void | never => {
    const model3d: TModel3d = space.services.models3dService.getRegistry().getByName('fox_glb_config_original');
    // eslint-disable-next-line functional/immutable-data
    model3d.getRawModel3d().position.x += 5;
    // eslint-disable-next-line functional/immutable-data
    model3d.getRawModel3d().rotation.y = 1.57;
  }
};
