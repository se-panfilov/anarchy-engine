import type { TOrbitControlsWrapper, TSpace, TSpaceConfig } from '@hellpig/anarchy-engine';
import { BehaviorSubject } from 'rxjs';
import { Euler } from 'three';

import type { TSpacesData } from '../ShowcaseTypes';
import { addModel3dToScene, getContainer } from '../utils';
import spaceConfig from './spaceOrbitControls.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceOrbitControlsData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace): void | never => {
    addModel3dToScene(space, 'surface_model');
  },
  onChange: (space: TSpace): void => {
    const controls: TOrbitControlsWrapper = space.services.controlsService.getActive() as TOrbitControlsWrapper;
    controls.rotateCameraTo(new Euler(-0.21611581505751948, 0.7673075650744225, 0.15124389190255216));
  }
};
