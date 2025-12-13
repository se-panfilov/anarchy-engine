import type { Subscription } from 'rxjs';

import type { TModel3d, TRegistryPack, TSpace, TSpaceConfig } from '@/Engine';
import { isNotDefined } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceCustomModels.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceCustomModelsData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  onCreate: (space: TSpace, subscriptions?: Record<string, Subscription>): void | never => {
    const sub$: Subscription = space.services.models3dService.getRegistry().added$.subscribe(({ value: model3dSource }: TRegistryPack<TModel3d>): void => {
      space.services.scenesService.findActive()?.addModel3d(model3dSource);
    });

    if (isNotDefined(subscriptions)) throw new Error(`[Showcase]: Subscriptions is not defined`);

    // eslint-disable-next-line functional/immutable-data
    subscriptions[config.name] = sub$;
  },
  onChange: (space: TSpace): void | never => {
    const model3d: TModel3d | undefined = space.services.models3dService.getRegistry().findByName('fox_glb_config_original');
    if (isNotDefined(model3d)) throw new Error(`[Showcase]: Model3d is not found`);
    // eslint-disable-next-line functional/immutable-data
    model3d.getRawModel3d().position.x += 5;
    // eslint-disable-next-line functional/immutable-data
    model3d.getRawModel3d().rotation.y = 1.57;
  },
  onUnload: (_space: TSpace, subscriptions?: Record<string, Subscription>): void | never => {
    if (isNotDefined(subscriptions)) throw new Error(`[Showcase]: Subscriptions is not defined`);
    subscriptions[config.name].unsubscribe();
  }
};
