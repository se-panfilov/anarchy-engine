import type { TActor, TAnyCameraWrapper, TReadonlyVector3, TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { spaceService } from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import type { Vector3 } from 'three';

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
  const { actorService, cameraService, physicsWorldService } = space.services;
  const { physicsLoop } = space.loops;

  const actorAsyncRegistry = actorService.getRegistry();

  const actor1: TActor = actorAsyncRegistry.getByName('actor_1');
  const actor2: TActor = actorAsyncRegistry.getByName('actor_2');
  const actor3: TActor = actorAsyncRegistry.getByName('actor_3');

  const cameraW: TAnyCameraWrapper = cameraService.getActive();

  actor1.drive.physics.physicsBody$.value?.getRigidBody()?.addTorque({ x: -0.2, y: 0.5, z: 1 }, true);
  actor2.drive.physics.physicsBody$.value?.getRigidBody()?.addTorque({ x: -0.5, y: -0.01, z: 0.05 }, true);
  actor3.drive.physics.physicsBody$.value?.getRigidBody()?.addTorque({ x: 0.01, y: 5, z: -0.05 }, true);

  const actor1Position: TReadonlyVector3 = actor1.drive.position$.value;
  cameraW.lookAt(actor1Position as Vector3);
  cameraW.drive.default.setY(actor1Position.y);

  physicsWorldService.getDebugRenderer(physicsLoop).start();

  physicsLoop.tick$.subscribe(() => {
    actor3.drive.physics.physicsBody$.value?.getRigidBody()?.setAngvel({ x: 0, y: 3, z: 1 }, true);
    cameraW.drive.default.setY(actor1.drive.position$.value.y);
  });

  space.start$.next(true);
}
