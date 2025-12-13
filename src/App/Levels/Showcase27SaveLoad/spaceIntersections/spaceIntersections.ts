import { BehaviorSubject, skip } from 'rxjs';
import type { Mesh, MeshStandardMaterial } from 'three';
import type { Line2 } from 'three/examples/jsm/lines/Line2';

import type { TActor, TIntersectionEvent, TIntersectionsCameraWatcher, TIntersectionsDirectionWatcher, TSpace, TSpaceConfig } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceIntersections.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

// TODO 15-0-0: Implement intersections among actors (add source, direction). Camera intersection should be a private case of intersections.
// TODO 15-0-0: should serialize "shouldReactOnlyOnChange"
// TODO 15-0-0: should serialize "far"
export const spaceIntersectionsData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace): void | never => {
    const cameraWatcherRed: TIntersectionsCameraWatcher = space.services.intersectionsWatcherService.getCameraWatcher('watcher_red');
    const directionWatcherBlue: TIntersectionsDirectionWatcher = space.services.intersectionsWatcherService.getDirectionWatcher('watcher_blue');

    const line: Line2 = directionWatcherBlue._debugGetRayVisualizationLine(space.container, 25);
    space.services.scenesService.getActive().entity.add(line);
    // const dir = directionWatcherBlue.targetPointToDirection(directionWatcherBlue.origin$.value, { x: 13, y: 0, z: 8 });
    // console.log('XXX', dir);

    cameraWatcherRed.value$.pipe(skip(1)).subscribe((value: TIntersectionEvent): void => {
      // console.log('redWatcher', new Date().getMilliseconds(), value.object.name);
      ((value.object as Mesh).material as MeshStandardMaterial).color.set('yellow');
    });

    directionWatcherBlue.value$.subscribe((value: TIntersectionEvent): void => {
      // console.log('blueWatcher', new Date().getMilliseconds(), value.object.name);
      ((value.object as Mesh).material as MeshStandardMaterial).color.set('green');
    });
  },
  onChange: (space: TSpace): void => {
    const cameraWatcherRed: TIntersectionsCameraWatcher = space.services.intersectionsWatcherService.getCameraWatcher('watcher_red');
    const directionWatcherBlue: TIntersectionsDirectionWatcher = space.services.intersectionsWatcherService.getDirectionWatcher('watcher_blue');
    const cube1BlueActor: TActor = space.services.actorService.getRegistry().getByName('cube_blue_1_actor');
    const sphereRed2Actor: TActor = space.services.actorService.getRegistry().getByName('sphere_red_2_actor');

    cameraWatcherRed.setFar(10);
    directionWatcherBlue.setFar(5);

    // TODO 15-0-0: Prevent adding actors multiple times (same id, same name)
    cameraWatcherRed.addActor(sphereRed2Actor);
    directionWatcherBlue.addActor(cube1BlueActor);
    console.log('XXX actors', cameraWatcherRed.getActors());
  }
};
