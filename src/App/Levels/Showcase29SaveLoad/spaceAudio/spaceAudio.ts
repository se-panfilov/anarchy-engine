import { BehaviorSubject } from 'rxjs';

import type { TAudio3dWrapper, TSpace, TSpaceConfig } from '@/Engine';
import { DebugAudioRenderer } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { addModel3dToScene, getContainer } from '../utils';
import spaceConfig from './spaceAudio.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceAudioData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace): void | never => {
    addModel3dToScene(space, 'surface_model');
    const gunshot1: TAudio3dWrapper = space.services.audioService.getRegistry().getByName('gunshot_1') as TAudio3dWrapper;
    DebugAudioRenderer(gunshot1, space.services.scenesService.getActive(), space.loops.audioLoop);
  },
  onChange: (space: TSpace): void => {
    // space.services.actorService.getRegistry().getByName('sphere_actor').drive.default.setX(10);
  }
};
