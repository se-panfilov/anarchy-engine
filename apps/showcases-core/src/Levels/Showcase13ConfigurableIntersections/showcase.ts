import type { TAnyCameraWrapper, TCameraRegistry, TIntersectionEvent, TIntersectionsCameraWatcher, TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { spaceService } from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import GUI from 'lil-gui';

import type { TAppSettings } from '@/Models';
import { enableFPSCounter, watchActiveRendererReady, watchResourceLoading } from '@/Utils';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);
  watchResourceLoading(space);
  if (settings.loopsDebugInfo) enableFPSCounter(space.loops.renderLoop.tick$);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  watchActiveRendererReady(space);
  const gui: GUI = new GUI();
  const { cameraService, intersectionsWatcherService, mouseService } = space.services;
  const cameraRegistry: TCameraRegistry = cameraService.getRegistry();
  const { clickLeftRelease$ } = mouseService;

  const watcherRed: TIntersectionsCameraWatcher = intersectionsWatcherService.getCameraWatcher('watcher_red');
  const watcherBlue: TIntersectionsCameraWatcher = intersectionsWatcherService.getCameraWatcher('watcher_blue');

  watcherRed.value$.subscribe((value: TIntersectionEvent): void => console.log('redWatcher', value));
  watcherBlue.value$.subscribe((value: TIntersectionEvent): void => console.log('blueWatcher', value));

  let cameraFolder: GUI | undefined;
  let cameraName: string = 'camera_red';
  clickLeftRelease$.subscribe((): void => {
    const camera: TAnyCameraWrapper = cameraRegistry.getByName(cameraName);
    // console.log(cameraName, cameraService.findActive()?.name, cameraName === cameraService.findActive()?.name);
    cameraFolder = resetGui(gui, cameraFolder, camera);

    cameraService.setActive(camera.id);
    cameraName = cameraName === 'camera_red' ? 'camera_blue' : 'camera_red';
  });

  space.start$.next(true);
}

function resetGui(gui: GUI, folder: GUI | undefined, camera: TAnyCameraWrapper): GUI {
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
