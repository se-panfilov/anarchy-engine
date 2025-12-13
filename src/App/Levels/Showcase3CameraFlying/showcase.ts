import { combineLatest } from 'rxjs';
import type { Vector3 } from 'three';

import type { TActor, TActorRegistry, TCameraWrapper, TSpace, TSpaceConfig } from '@/Engine';
import { ambientContext, asRecord, getRotationByCos, getRotationBySin, isNotDefined, spaceService } from '@/Engine';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig]));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const { actorService, cameraService, mouseService } = space.services;
  const actorRegistry: TActorRegistry = actorService.getRegistry();

  const camera: TCameraWrapper | undefined = cameraService.findActive();

  const { screenSizeWatcher } = ambientContext;
  combineLatest([mouseService.position$, screenSizeWatcher.value$]).subscribe(([coords, { width, height }]): void => {
    if (isNotDefined(camera)) return;
    const xRatio: number = coords.x / width - 0.5;
    const yRatio: number = -(coords.y / height - 0.5);

    const xRotation: number = getRotationBySin(xRatio, 1, 2);
    const yRotation: number = getRotationByCos(xRatio, 1, 2);
    // camera.drive.default.setX(xRatio * 10);
    camera.drive.default.setX(xRotation);
    camera.drive.default.setY(yRatio * 10);
    camera.drive.default.setZ(yRotation);

    const actor: TActor | undefined = actorRegistry.findByName('central_actor');
    if (isNotDefined(actor)) throw new Error('Actor not found');
    camera.lookAt(actor.drive.position$.value as Vector3);
  });

  space.start$.next(true);
}
