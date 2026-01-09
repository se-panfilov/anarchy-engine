import type { TActor, TActorRegistry, TMilliseconds, TModel3d, TModels3dRegistry, TSceneWrapper, TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { spaceService } from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import { Clock } from 'three';

import type { TAppSettings } from '@/Models';
import { addGizmo, enableFPSCounter, watchResourceLoading } from '@/Utils';

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
  const { actorService, models3dService, scenesService } = space.services;
  const { transformLoop } = space.loops;

  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const sceneW: TSceneWrapper = scenesService.getActive();

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  const planeModel3d: TModel3d = models3dRegistry.getByName('surface_model');

  sceneW.addModel3d(planeModel3d);

  const actor: TActor = actorRegistry.getByName('sphere_actor');

  const clock: Clock = new Clock();
  transformLoop.tick$.subscribe((): void => {
    const elapsedTime: TMilliseconds = clock.getElapsedTime() as TMilliseconds;
    actor.drive.default.setX(Math.sin(elapsedTime) * 8);
    actor.drive.default.setZ(Math.cos(elapsedTime) * 8);
    // actor.drive.position$.next(new Vector3(Math.sin(elapsedTime) * 8, actor.drive.position$.value.y, Math.cos(elapsedTime) * 8));
  });

  space.start$.next(true);
}
