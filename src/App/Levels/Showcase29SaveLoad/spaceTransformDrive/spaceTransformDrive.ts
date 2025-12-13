import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type { TSpace, TSpaceConfig } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceTransformDrive.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

// TODO 15-0-0: add physical TD check after serialization physics will be done
export const spaceTransformDriveData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace, subscriptions?: Record<string, Subscription>): void | never => {
    //
  },
  onChange: (space: TSpace): void => {
    // Do loops stop after the change to check the screenshot
  },
  onUnload: (_space: TSpace, subscriptions?: Record<string, Subscription>): void | never => {
    //
  }
};
