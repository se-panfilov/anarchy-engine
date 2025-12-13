import GUI from 'lil-gui';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorAsyncRegistry, IActorWrapperAsync, IAppCanvas, ICameraRegistry, ICameraWrapper, ISpace, ISpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, isNotDefined, mouseService } from '@/Engine';

import spaceConfig from './showcase-14.json';

//Showcase 14: Switching Active Camera
export function showcase(canvas: IAppCanvas): IShowcase {
  const gui: GUI = new GUI();
  const space: ISpace = buildSpaceFromConfig(canvas, spaceConfig as ISpaceConfig);
  const { actorService, cameraService, loopService } = space.services;
  const actorRegistry: IActorAsyncRegistry = actorService.getRegistry();
  const cameraRegistry: ICameraRegistry = cameraService.getRegistry();
  const { clickLeftRelease$ } = mouseService;

  async function init(): Promise<void> {
    const actor: IActorWrapperAsync = await actorRegistry.findByNameAsync('ball');
    actor.setY(2);

    let cameraFolder: GUI | undefined;
    let counter: number = 1;
    const getCameraName = (): string => `cam${counter}`;
    clickLeftRelease$.subscribe((): void => {
      const camera: ICameraWrapper | undefined = cameraRegistry.findByName(getCameraName());
      console.log(getCameraName(), cameraService.findActive()?.name, getCameraName() === cameraService.findActive()?.name);
      if (isNotDefined(camera)) throw new Error(`Cannot switch camera: camera ("${getCameraName()}") not found`);
      cameraFolder = resetGui(cameraFolder, camera);

      cameraService.setActive(camera.id);
      counter = counter === 1 ? 2 : 1;
    });

    loopService.tick$.subscribe(({ elapsedTime }) => {
      actor.setX(Math.sin(elapsedTime) * 8);
      actor.setZ(Math.cos(elapsedTime) * 8);
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
