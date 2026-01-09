import type { TActor, TActorRegistry, TAnyCameraWrapper, TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { getRotationByCos, getRotationBySin, spaceService } from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import { combineLatest, distinctUntilChanged } from 'rxjs';
import type { Vector2Like, Vector3 } from 'three';

import type { TAppSettings } from '@/Models';
import { enableFPSCounter, watchResourceLoading } from '@/Utils';

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
  const { actorService, cameraService, mouseService } = space.services;
  const actorRegistry: TActorRegistry = actorService.getRegistry();

  const camera: TAnyCameraWrapper = cameraService.getActive();

  combineLatest([mouseService.position$, space.container.viewportRect$])
    .pipe(
      distinctUntilChanged((prev: [Vector2Like, DOMRect], curr: [Vector2Like, DOMRect]): boolean => {
        const prevVector: Vector2Like = prev[0];
        const currVector: Vector2Like = curr[0];
        return prevVector.x === currVector.x && prevVector.y === currVector.y;
      })
    )
    .subscribe(([coords, { width, height }]): void => {
      if (isNotDefined(camera)) return;
      const xRatio: number = coords.x / width - 0.5;
      const yRatio: number = -(coords.y / height - 0.5);

      const xRotation: number = getRotationBySin(xRatio, 1, 2);
      const yRotation: number = getRotationByCos(xRatio, 1, 2);
      // camera.drive.default.setX(xRatio * 10);
      camera.drive.default.setX(xRotation);
      camera.drive.default.setY(yRatio * 10);
      camera.drive.default.setZ(yRotation);

      const actor: TActor = actorRegistry.getByName('central_actor');
      camera.lookAt(actor.drive.position$.value as Vector3);
    });

  space.start$.next(true);
}
