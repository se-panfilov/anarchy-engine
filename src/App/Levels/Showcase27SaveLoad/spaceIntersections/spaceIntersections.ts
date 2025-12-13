import { BehaviorSubject } from 'rxjs';

import type { TSpace, TSpaceConfig } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceIntersections.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceIntersectionsData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace): void | never => {
    //
  },
  onChange: (space: TSpace): void => {
    //
  }
};
