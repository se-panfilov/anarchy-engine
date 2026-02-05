import type { TActor, TIntersectionEvent, TIntersectionsCameraWatcher, TIntersectionsDirectionWatcher, TSpace, TSpaceConfig } from '@hellpig/anarchy-engine';
import { isNotDefined } from '@hellpig/anarchy-shared/Utils';
import { BehaviorSubject, skip } from 'rxjs';
import type { Mesh, MeshStandardMaterial } from 'three';
import type { Line2 } from 'three/examples/jsm/lines/Line2';

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
    const cameraWatcherRed: TIntersectionsCameraWatcher = space.services.intersectionsWatcherService.getCameraWatcher('watcher_red');
    const directionWatcherBlue: TIntersectionsDirectionWatcher = space.services.intersectionsWatcherService.getDirectionWatcher('watcher_blue');

    const line: Line2 = directionWatcherBlue._debugGetRayVisualizationLine(space.container, 25);
    space.services.scenesService.getActive().entity.add(line);

    cameraWatcherRed.value$.pipe(skip(1)).subscribe((value: TIntersectionEvent): void => {
      if (isNotDefined(value)) throw new Error('Intersection not defined');
      // console.log('redWatcher', new Date().getMilliseconds(), value.object.name);
      ((value.object as Mesh).material as MeshStandardMaterial).color.set('yellow');
    });

    directionWatcherBlue.value$.subscribe((value: TIntersectionEvent): void => {
      if (isNotDefined(value)) throw new Error('Intersection not defined');
      // console.log('blueWatcher', new Date().getMilliseconds(), value.object.name);
      ((value.object as Mesh).material as MeshStandardMaterial).color.set('green');
    });
  },
  onChange: (space: TSpace): void => {
    const cameraWatcherRed: TIntersectionsCameraWatcher = space.services.intersectionsWatcherService.getCameraWatcher('watcher_red');
    const directionWatcherBlue: TIntersectionsDirectionWatcher = space.services.intersectionsWatcherService.getDirectionWatcher('watcher_blue');
    const cube1BlueActor: TActor = space.services.actorService.getRegistry().getByName('cube_blue_1_actor');
    const sphereRed2Actor: TActor = space.services.actorService.getRegistry().getByName('sphere_red_2_actor');

    cameraWatcherRed.setFar(100);
    directionWatcherBlue.setFar(5);

    cameraWatcherRed.addActor(sphereRed2Actor);
    directionWatcherBlue.addActor(cube1BlueActor);
  }
};
