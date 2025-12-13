import GUI from 'lil-gui';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActorAsyncRegistry, TActorWrapperAsync, TAppCanvas, TCameraRegistry, TCameraWrapper, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined, mouseService } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const gui: GUI = new GUI();
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { loopService } = engine.services;

  const { actorService, cameraService } = space.services;
  const actorRegistry: TActorAsyncRegistry = actorService.getRegistry();
  const cameraRegistry: TCameraRegistry = cameraService.getRegistry();
  const { clickLeftRelease$ } = mouseService;

  async function init(): Promise<void> {
    const actor: TActorWrapperAsync | undefined = await actorRegistry.findByNameAsync('ball');
    if (isNotDefined(actor)) throw new Error('Cannot find actor"');
    actor.setY(2);

    let cameraFolder: GUI | undefined;
    let counter: number = 1;
    const getCameraName = (): string => `cam${counter}`;
    clickLeftRelease$.subscribe((): void => {
      const camera: TCameraWrapper | undefined = cameraRegistry.findByName(getCameraName());
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
