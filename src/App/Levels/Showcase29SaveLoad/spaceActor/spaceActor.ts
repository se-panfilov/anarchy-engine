import type { TSpace, TSpaceConfig } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceActor.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceActorData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  onChange: (space: TSpace): void => {
    // TODO 15-0-0: "states" and FSM not saves
    // console.log('XXX position', space.services.cameraService.findActive().entity.position);
    // console.log('XXX rotation', space.services.cameraService.findActive().entity.rotation);
    //XXX position {x: 1.787368434424427, y: 4.714311488359444, z: 10.511963126740232}
    //XXX rotation {x: -0.7476708028448679, y: 0.6094718078100407, z: 0.4879773445044666 }
  }
};
