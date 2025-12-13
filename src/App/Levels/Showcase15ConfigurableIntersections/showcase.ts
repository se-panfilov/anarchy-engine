import GUI from 'lil-gui';

import type { TShowcase } from '@/App/Levels/Models';
import type { TIntersectionEvent, TAppCanvas, TCameraRegistry, TCameraWrapper, TEngine, TIntersectionsWatcher, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined, mouseService } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const gui: GUI = new GUI();
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  const { cameraService, intersectionsWatcherService } = space.services;
  const cameraRegistry: TCameraRegistry = cameraService.getRegistry();
  const { clickLeftRelease$ } = mouseService;

  function init(): void {
    intersectionsWatcherService.getRegistry().findByName$('watcher_red').subscribe(onRedWatcher);
    intersectionsWatcherService.getRegistry().findByName$('watcher_blue').subscribe(onBlueWatcher);

    function onRedWatcher(redWatcher: TIntersectionsWatcher): void {
      redWatcher.value$.subscribe((value: TIntersectionEvent) => console.log('redWatcher', value));
    }

    function onBlueWatcher(blueWatcher: TIntersectionsWatcher): void {
      blueWatcher.value$.subscribe((value: TIntersectionEvent) => console.log('blueWatcher', value));
    }

    let cameraFolder: GUI | undefined;
    let cameraName: string = 'camera_red';
    clickLeftRelease$.subscribe((): void => {
      const camera: TCameraWrapper | undefined = cameraRegistry.findByName(cameraName);
      // console.log(cameraName, cameraService.findActive()?.name, cameraName === cameraService.findActive()?.name);
      if (isNotDefined(camera)) throw new Error(`Cannot switch camera: camera ("${cameraName}") not found`);
      cameraFolder = resetGui(cameraFolder, camera);

      cameraService.setActive(camera.id);
      cameraName = cameraName === 'camera_red' ? 'camera_blue' : 'camera_red';
    });
  }

  function resetGui(folder: GUI | undefined, camera: TCameraWrapper): GUI {
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

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
