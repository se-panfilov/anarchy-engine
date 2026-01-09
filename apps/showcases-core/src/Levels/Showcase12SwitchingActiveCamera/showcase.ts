import type { TActor, TActorRegistry, TAnyCameraWrapper, TCameraRegistry, TMilliseconds, TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { spaceService } from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import GUI from 'lil-gui';
import { Clock } from 'three';

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
  const { actorService, cameraService, mouseService } = space.services;
  const { transformLoop } = space.loops;
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const cameraRegistry: TCameraRegistry = cameraService.getRegistry();
  const { clickLeftRelease$ } = mouseService;

  const actor: TActor = actorRegistry.getByName('sphere_actor');
  actor.drive.default.setY(2);

  let cameraFolder: GUI | undefined;
  let counter: number = 1;
  const getCameraName = (): string => `cam${counter}`;
  clickLeftRelease$.subscribe((): void => {
    const camera: TAnyCameraWrapper = cameraRegistry.getByName(getCameraName());
    console.log(getCameraName(), cameraService.getActive().name, getCameraName() === cameraService.findActive()?.name);
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
