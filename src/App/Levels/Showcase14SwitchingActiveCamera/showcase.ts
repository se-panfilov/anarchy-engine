import GUI from 'lil-gui';
import { Clock } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActor, TActorRegistry, TCameraRegistry, TCameraWrapper, TEngine, TMilliseconds, TSpace, TSpaceConfig } from '@/Engine';
import { Engine, isNotDefined, spaceService } from '@/Engine';

import spaceConfigJson from './showcase.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function showcase(): TShowcase {
  const gui: GUI = new GUI();
  const spaces: ReadonlyArray<TSpace> = spaceService.createFromConfig([spaceConfig]);
  // TODO 14-0-0: implement spaceService.findActive()
  const space: TSpace = spaces[0];
  const engine: TEngine = Engine(space);

  const { actorService, cameraService, mouseService } = space.services;
  const { transformLoop } = space.loops;
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const cameraRegistry: TCameraRegistry = cameraService.getRegistry();
  const { clickLeftRelease$ } = mouseService;

  function init(): void {
    const actor: TActor | undefined = actorRegistry.findByName('sphere_actor');
    if (isNotDefined(actor)) throw new Error('Cannot find actor');
    actor.drive.default.setY(2);

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

    const clock: Clock = new Clock();
    transformLoop.tick$.subscribe((): void => {
      const elapsedTime: TMilliseconds = clock.getElapsedTime() as TMilliseconds;
      actor.drive.default.setX(Math.sin(elapsedTime) * 8);
      actor.drive.default.setZ(Math.cos(elapsedTime) * 8);
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
