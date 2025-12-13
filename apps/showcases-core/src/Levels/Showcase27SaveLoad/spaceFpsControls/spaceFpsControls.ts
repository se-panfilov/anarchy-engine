import type { TFpsControlsWrapper, TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { BehaviorSubject } from 'rxjs';
import { Euler } from 'three';

import type { TSpacesData } from '../ShowcaseTypes';
import { addModel3dToScene, getContainer } from '../utils';
import spaceConfig from './spaceFpsControls.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceFpsControlsData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace): void | never => {
    addModel3dToScene(space, 'surface_model');
  },
  onChange: (space: TSpace): void => {
    const controls: TFpsControlsWrapper = space.services.controlsService.getActive() as TFpsControlsWrapper;

    controls.rotateCameraTo(new Euler(-0.2, 0.3, 0));
  }
};
