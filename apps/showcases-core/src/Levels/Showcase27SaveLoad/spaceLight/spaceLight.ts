import type { THemisphereLightWrapper, TPointLightWrapper, TSpace, TSpaceConfig, TSpotLightWrapper } from '@Anarchy/Engine';
import type { TWriteable } from '@Anarchy/Shared/Utils';
import { BehaviorSubject } from 'rxjs';
import type { HemisphereLight, PointLight, SpotLight } from 'three';
import { Color, Vector3 } from 'three';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceLight.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceLightData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onChange: (space: TSpace): void => {
    const hemisphere: THemisphereLightWrapper = space.services.lightService.getRegistry().getByName('hemisphere_light') as THemisphereLightWrapper;
    const pointLight: TPointLightWrapper = space.services.lightService.getRegistry().getByName('point_light') as TPointLightWrapper;
    const spotlight: TSpotLightWrapper = space.services.lightService.getRegistry().getByName('spot_light') as TSpotLightWrapper;

    // eslint-disable-next-line functional/immutable-data
    (hemisphere.entity as TWriteable<HemisphereLight>).color = new Color('#2121AB');
    // eslint-disable-next-line functional/immutable-data
    (hemisphere.entity as TWriteable<HemisphereLight>).intensity = 1.1;

    pointLight.drive.position$.next(new Vector3(4, 15.5, 2.5));
    // eslint-disable-next-line functional/immutable-data
    (pointLight.entity as TWriteable<PointLight>).intensity = 16;
    // eslint-disable-next-line functional/immutable-data
    pointLight.entity.shadow.camera.far = 25;

    spotlight.drive.position$.next(new Vector3(4, 1.5, 2.5));
    // eslint-disable-next-line functional/immutable-data
    (spotlight.entity as TWriteable<SpotLight>).intensity = 5;
    // eslint-disable-next-line functional/immutable-data
    (spotlight.entity as TWriteable<SpotLight>).angle = 28.8;
  }
};
