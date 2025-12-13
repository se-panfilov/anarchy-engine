import type { TActor, TSpace, TSpaceConfig } from '@/Engine';
import { isNotDefined } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceActor.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceActorData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  onSpaceReady(space: TSpace): void {
    const solder: TActor | undefined = space.services.actorService.getRegistry().findByName('solder_actor_1');
    if (isNotDefined(solder)) throw new Error('Solder actor not found');

    solder.states.animationsFsm.send$.next('Idle');
  },
  onChange: (space: TSpace): void => {
    // TODO 15-0-0: "states" and FSM not saves
    console.log('XXX position', space.services.cameraService.findActive()?.entity.position);
    console.log('XXX rotation', space.services.cameraService.findActive()?.entity.rotation);
    //XXX position {x: 1.787368434424427, y: 4.714311488359444, z: 10.511963126740232}
    //XXX rotation {x: -0.7476708028448679, y: 0.6094718078100407, z: 0.4879773445044666 }
  }
};
