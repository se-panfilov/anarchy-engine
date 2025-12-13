import { BehaviorSubject } from 'rxjs';

import type { TIntersectionEvent, TIntersectionsWatcher, TSpace, TSpaceConfig } from '@/Engine';

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
    const watcherRed: TIntersectionsWatcher = space.services.intersectionsWatcherService.getRegistry().getByName('watcher_red');
    const watcherBlue: TIntersectionsWatcher = space.services.intersectionsWatcherService.getRegistry().getByName('watcher_blue');

    watcherRed.value$.subscribe((value: TIntersectionEvent): void => console.log('redWatcher', value));
    watcherBlue.value$.subscribe((value: TIntersectionEvent): void => console.log('blueWatcher', value));
  },
  onChange: (space: TSpace): void => {
    //
  }
};
