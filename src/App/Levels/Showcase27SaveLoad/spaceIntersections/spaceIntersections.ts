import { BehaviorSubject, skip } from 'rxjs';
import type { Mesh, MeshStandardMaterial } from 'three';

import type { TActor, TIntersectionEvent, TIntersectionsWatcher, TSpace, TSpaceConfig } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceIntersections.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

// TODO 15-0-0: Implement intersections among actors (add source, direction). Camera intersection should be a private case of intersections.
export const spaceIntersectionsData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace): void | never => {
    const watcherRed: TIntersectionsWatcher = space.services.intersectionsWatcherService.getRegistry().getByName('watcher_red');
    const watcherBlue: TIntersectionsWatcher = space.services.intersectionsWatcherService.getRegistry().getByName('watcher_blue');

    watcherRed.value$.pipe(skip(1)).subscribe((value: TIntersectionEvent): void => {
      console.log('redWatcher', value);
      ((value.object as Mesh).material as MeshStandardMaterial).color.set('yellow');
    });
    watcherBlue.value$.subscribe((value: TIntersectionEvent): void => console.log('blueWatcher', value));
  },
  onChange: (space: TSpace): void => {
    const watcherRed: TIntersectionsWatcher = space.services.intersectionsWatcherService.getRegistry().getByName('watcher_red');
    const sphereRed2Actor: TActor = space.services.actorService.getRegistry().getByName('sphere_red_2_actor');
    // TODO 15-0-0: Prevent adding actors multiple times (same id, same name)
    watcherRed.addActor(sphereRed2Actor);
    console.log('XXX actors', watcherRed.getActors());
  }
};
