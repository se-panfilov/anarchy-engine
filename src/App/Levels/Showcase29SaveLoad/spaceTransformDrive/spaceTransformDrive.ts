import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type { TSpace, TSpaceConfig } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceTransformDrive.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceTransformDriveData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace, subscriptions?: Record<string, Subscription>): void | never => {
    //
  },
  onChange: (space: TSpace): void => {
    //
  },
  onUnload: (_space: TSpace, subscriptions?: Record<string, Subscription>): void | never => {
    //
  }
};
