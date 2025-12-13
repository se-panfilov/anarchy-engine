import type { Vector3 } from 'three/src/math/Vector3';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActor, TAppCanvas, TCameraWrapper, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { Engine, isNotDefined, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { actorService, cameraService, loopService, physicsWorldService } = space.services;

  const actorAsyncRegistry = actorService.getRegistry();

  function init(): void {
    const actor1: TActor | undefined = actorAsyncRegistry.findByName('actor_1');
    if (isNotDefined(actor1)) throw new Error(`Cannot find "actor_1" actor`);

    const actor2: TActor | undefined = actorAsyncRegistry.findByName('actor_2');
    if (isNotDefined(actor2)) throw new Error(`Cannot find "actor_2" actor`);

    const actor3: TActor | undefined = actorAsyncRegistry.findByName('actor_3');
    if (isNotDefined(actor3)) throw new Error(`Cannot find "actor_3" actor`);

    const cameraW: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(cameraW)) throw new Error(`Cannot find active camera`);

    // TODO CWP: 8.0.0. MODELS: Perhaps, "applyImpulse" (and similar functions) should be available via physical drive
    actor1.drive.physical.physicsBody$.value?.getRigidBody()?.addTorque({ x: -0.2, y: 0.5, z: 1 }, true);
    actor2.drive.physical.physicsBody$.value?.getRigidBody()?.addTorque({ x: -0.5, y: -0.01, z: 0.05 }, true);
    actor3.drive.physical.physicsBody$.value?.getRigidBody()?.addTorque({ x: 0.01, y: 5, z: -0.05 }, true);

    const actor1Position: Vector3 = actor1.drive.position$.value;
    cameraW.lookAt(actor1Position);
    cameraW.drive.default.setY(actor1Position.y);

    physicsWorldService.getDebugRenderer(loopService).start();

    loopService.tick$.subscribe(() => {
      // TODO CWP: 8.0.0. MODELS: Perhaps, "applyImpulse" (and similar functions) should be available via physical drive
      actor3.drive.physical.physicsBody$.value?.getRigidBody()?.setAngvel({ x: 0, y: 3, z: 1 }, true);
      cameraW.drive.default.setY(actor1.drive.position$.value.y);
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
