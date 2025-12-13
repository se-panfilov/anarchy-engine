import type { Subscription } from 'rxjs';
import { Euler } from 'three';

import type { TModel3d, TOrbitControlsWrapper, TRegistryPack, TSpace, TSpaceConfig } from '@/Engine';
import { isNotDefined } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceFpsControls.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceFpsControlsData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  onCreate: (space: TSpace, subscriptions?: Record<string, Subscription>): void | never => {
    const sub$: Subscription = space.services.models3dService.getRegistry().added$.subscribe(({ value: model3dSource }: TRegistryPack<TModel3d>): void => {
      if (model3dSource.name === 'surface_model') space.services.scenesService.findActive()?.addModel3d(model3dSource);
    });

    if (isNotDefined(subscriptions)) throw new Error(`[Showcase]: Subscriptions is not defined`);

    // eslint-disable-next-line functional/immutable-data
    subscriptions[config.name] = sub$;
  },
  onChange: (space: TSpace): void => {
    const controls: TOrbitControlsWrapper | undefined = space.services.controlsService.findActive() as TOrbitControlsWrapper | undefined;
    if (isNotDefined(controls)) throw new Error(`[Showcase]: Controls are not defined for space "${space.name}"`);

    controls.rotateCameraTo(new Euler(-0.21611581505751948, 0.7673075650744225, 0.15124389190255216));
  },
  onUnload: (_space: TSpace, subscriptions?: Record<string, Subscription>): void | never => {
    if (isNotDefined(subscriptions)) throw new Error(`[Showcase]: Subscriptions is not defined`);
    subscriptions[config.name].unsubscribe();
  }
};
