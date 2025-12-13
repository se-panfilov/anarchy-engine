import type { TSpace, TSpaceConfig } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceActor.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceActorData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  onChange: (space: TSpace): void => {}
};
