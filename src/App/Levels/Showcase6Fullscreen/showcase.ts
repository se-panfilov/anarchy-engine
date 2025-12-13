import { Clock } from 'three';

import { addGizmo } from '@/App/Levels/Utils';
import type { TActor, TActorRegistry, TMilliseconds, TModel3d, TModels3dRegistry, TSceneWrapper, TSpace, TSpaceConfig } from '@/Engine';
import { ambientContext, asRecord, isNotDefined, screenService, spaceService } from '@/Engine';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig]));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const { actorService, models3dService, mouseService, scenesService } = space.services;
  const { transformLoop } = space.loops;
  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();
  const actorRegistry: TActorRegistry = actorService.getRegistry();

  const sceneW: TSceneWrapper | undefined = scenesService.findActive();
  if (isNotDefined(sceneW)) throw new Error('Scene is not defined');

  addGizmo(space.services, ambientContext.screenSizeWatcher, space.loops, { placement: 'bottom-left' });

  const planeModel3d: TModel3d | undefined = models3dRegistry.findByName('surface_model');
  if (isNotDefined(planeModel3d)) throw new Error('Plane model is not defined');

  sceneW.addModel3d(planeModel3d);

  const actor: TActor | undefined = actorRegistry.findByName('sphere_actor');
  if (isNotDefined(actor)) throw new Error('Actor is not found');
  actor.drive.default.setY(2);

  mouseService.clickLeftRelease$.subscribe(() => {
    void screenService.toggleFullScreen();
  });

  const clock: Clock = new Clock();
  //Better to move actors via kinematic (or physics), but for a simple example we can just set coords
  transformLoop.tick$.subscribe((): void => {
    const elapsedTime: TMilliseconds = clock.getElapsedTime() as TMilliseconds;
    actor.drive.default.setX(Math.sin(elapsedTime) * 8);
    actor.drive.default.setZ(Math.cos(elapsedTime) * 8);
    // actor.drive.position$.next(new Vector3(Math.sin(elapsedTime) * 8, actor.drive.position$.value.y, Math.cos(elapsedTime) * 8));
  });

  space.start$.next(true);
}
