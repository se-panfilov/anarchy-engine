import GUI from 'lil-gui';

import type { TCameraRegistry, TCameraWrapper, TIntersectionEvent, TIntersectionsWatcher, TSpace, TSpaceConfig } from '@/Engine';
import { isNotDefined, spaceService } from '@/Engine';

import spaceConfigJson from './showcase.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(): void {
  const spaces: ReadonlyArray<TSpace> = spaceService.createFromConfig([spaceConfig]);
  // TODO 14-0-0: implement spaceService.findActive()
  const space: TSpace = spaces[0];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const gui: GUI = new GUI();
  const { cameraService, intersectionsWatcherService, mouseService } = space.services;
  const cameraRegistry: TCameraRegistry = cameraService.getRegistry();
  const { clickLeftRelease$ } = mouseService;

  const watcherRed: TIntersectionsWatcher | undefined = intersectionsWatcherService.getRegistry().findByName('watcher_red');
  if (isNotDefined(watcherRed)) throw new Error('Watcher not found');
  const watcherBlue: TIntersectionsWatcher | undefined = intersectionsWatcherService.getRegistry().findByName('watcher_blue');
  if (isNotDefined(watcherBlue)) throw new Error('Watcher not found');

  watcherRed.value$.subscribe((value: TIntersectionEvent) => console.log('redWatcher', value));
  watcherBlue.value$.subscribe((value: TIntersectionEvent) => console.log('blueWatcher', value));

  let cameraFolder: GUI | undefined;
  let cameraName: string = 'camera_red';
  clickLeftRelease$.subscribe((): void => {
    const camera: TCameraWrapper | undefined = cameraRegistry.findByName(cameraName);
    // console.log(cameraName, cameraService.findActive()?.name, cameraName === cameraService.findActive()?.name);
    if (isNotDefined(camera)) throw new Error(`Cannot switch camera: camera ("${cameraName}") not found`);
    cameraFolder = resetGui(gui, cameraFolder, camera);

    cameraService.setActive(camera.id);
    cameraName = cameraName === 'camera_red' ? 'camera_blue' : 'camera_red';
  });

  space.start$.next(true);
}

function resetGui(gui: GUI, folder: GUI | undefined, camera: TCameraWrapper): GUI {
  folder?.destroy();
  folder = gui.addFolder(`Active camera ${camera.name}`);
  folder.add(camera.entity.position, 'x').min(-50).max(50).step(0.5);
  folder.add(camera.entity.position, 'y').min(-50).max(50).step(0.5);
  folder.add(camera.entity.position, 'z').min(-50).max(50).step(0.5);
  folder.add(camera.entity.rotation, 'x').min(-Math.PI).max(Math.PI).step(0.01);
  folder.add(camera.entity.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.01);
  folder.add(camera.entity.rotation, 'z').min(-Math.PI).max(Math.PI).step(0.01);
  return folder;
}
