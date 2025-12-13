import type { TCameraWrapper, TSpace, TSpaceConfig } from '@/Engine';
import { eulerToXyz, isNotDefined, vector3ToXyz } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceMaterials.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceMaterialsData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  onChange: (space: TSpace): void => {
    // TODO debug
    const camera: TCameraWrapper | undefined = space.services.cameraService.findActive();
    if (isNotDefined(camera)) throw new Error(`[Showcase]: Camera is not found`);
    console.log('XXX camera position', vector3ToXyz(camera.entity.position));
    console.log('XXX camera rotation', eulerToXyz(camera.entity.rotation));
    console.log('XXX implement');
  }
};
