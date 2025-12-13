import type { Subscription } from 'rxjs';

import type { TModel3d, TRegistryPack, TSpace, TSpaceConfig } from '@/Engine';
import { isNotDefined } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceBasic.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceBasicData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits: [],
  onCreate: (space: TSpace, subscriptions?: Record<string, Subscription>): void | never => {
    const sub$: Subscription = space.services.models3dService.getRegistry().added$.subscribe(({ value: model3dSource }: TRegistryPack<TModel3d>): void => {
      if (model3dSource.name === 'surface_model') space.services.scenesService.findActive()?.addModel3d(model3dSource);
    });

    if (isNotDefined(subscriptions)) throw new Error(`[Showcase]: Subscriptions is not defined`);

    // eslint-disable-next-line functional/immutable-data
    subscriptions[config.name] = sub$;
  },
  onChange: (space: TSpace): void => {
    space.services.actorService.getRegistry().findByName('sphere_actor')?.drive.default.setX(10);
  },
  onUnload: (_space: TSpace, subscriptions?: Record<string, Subscription>): void | never => {
    if (isNotDefined(subscriptions)) throw new Error(`[Showcase]: Subscriptions is not defined`);
    subscriptions[config.name].unsubscribe();
  }
};
