import GUI from 'lil-gui';

import type { IShowcase } from '@/App/Levels/Models';
import type { IAppCanvas, ICameraRegistry, ICameraWrapper, IIntersectionsWatcher, ISpace, ISpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, isNotDefined, mouseService } from '@/Engine';

import spaceConfig from './showcase-15.json';

//Showcase 15: configurable intersections
export function showcase(canvas: IAppCanvas): IShowcase {
  const gui: GUI = new GUI();
  const space: ISpace = buildSpaceFromConfig(canvas, spaceConfig as ISpaceConfig);
  const { cameraService, intersectionsService } = space.services;
  const cameraRegistry: ICameraRegistry = cameraService.getRegistry();
  const { clickLeftRelease$ } = mouseService;

  function init(): void {
    // TODO (S.Panfilov) should be async
    console.log(intersectionsService.getRegistry().getAll());
    const redWatcher: IIntersectionsWatcher | undefined = intersectionsService.getRegistry().findByName('red_watcher');
    if (isNotDefined(redWatcher)) throw new Error('Cannot find red watcher');
    // const blueWatcher: IIntersectionsWatcher | undefined = intersectionsService.getRegistry().findByName('blue_watcher');
    // if (isNotDefined(blueWatcher)) throw new Error('Cannot find blue watcher');

    redWatcher.value$.subscribe((value) => console.log('red watcher', value));

    let cameraFolder: GUI | undefined;
    let cameraName: string = 'camera_red';
    clickLeftRelease$.subscribe((): void => {
      const camera: ICameraWrapper | undefined = cameraRegistry.findByName(cameraName);
      // console.log(cameraName, cameraService.findActive()?.name, cameraName === cameraService.findActive()?.name);
      if (isNotDefined(camera)) throw new Error(`Cannot switch camera: camera ("${cameraName}") not found`);
      cameraFolder = resetGui(cameraFolder, camera);

      cameraService.setActive(camera.id);
      cameraName = cameraName === 'camera_red' ? 'camera_blue' : 'camera_red';
    });
  }

  function resetGui(folder: GUI | undefined, camera: ICameraWrapper): GUI {
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
    space.start();
    void init();
  }

  return { start, space };
}
