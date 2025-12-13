import GUI from 'lil-gui';
import { Clock } from 'three';

import type { TActor, TActorRegistry, TCameraRegistry, TCameraWrapper, TMilliseconds, TSpace, TSpaceConfig } from '@/Engine';
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
  const { actorService, cameraService, mouseService } = space.services;
  const { transformLoop } = space.loops;
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const cameraRegistry: TCameraRegistry = cameraService.getRegistry();
  const { clickLeftRelease$ } = mouseService;

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
    cameraFolder = resetGui(gui, cameraFolder, camera);

    cameraService.setActive(camera.id);
    counter = counter === 1 ? 2 : 1;
  });

  const clock: Clock = new Clock();
  transformLoop.tick$.subscribe((): void => {
    const elapsedTime: TMilliseconds = clock.getElapsedTime() as TMilliseconds;
    actor.drive.default.setX(Math.sin(elapsedTime) * 8);
    actor.drive.default.setZ(Math.cos(elapsedTime) * 8);
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
