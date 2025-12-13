import type { TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { BehaviorSubject } from 'rxjs';

import type { TSpacesData } from '../ShowcaseTypes';
import { changeText, getContainer } from '../utils';
import spaceConfig from './spaceTexts.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceTextData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onChange: (space: TSpace): void => {
    const { text2dRegistry, text3dRegistry, text3dTextureRegistry } = space.services.textService.getRegistries();
    changeText('text_2d', text2dRegistry);
    changeText('text_3d_1', text3dRegistry);
    changeText('text_3d_2', text3dTextureRegistry);
  }
};
