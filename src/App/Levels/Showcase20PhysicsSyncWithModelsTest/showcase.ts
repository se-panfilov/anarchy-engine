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
    const actor1W: TActor | undefined = actorAsyncRegistry.findByName('actor_1');
    if (isNotDefined(actor1W)) throw new Error(`Cannot find "actor_1" actor`);

    const actor2W: TActor | undefined = actorAsyncRegistry.findByName('actor_2');
    if (isNotDefined(actor2W)) throw new Error(`Cannot find "actor_2" actor`);

    const actor3W: TActor | undefined = actorAsyncRegistry.findByName('actor_3');
    if (isNotDefined(actor3W)) throw new Error(`Cannot find "actor_3" actor`);

    const cameraW: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(cameraW)) throw new Error(`Cannot find active camera`);

    actor1W.physicsBody?.getRigidBody()?.addTorque({ x: -0.2, y: 0.5, z: 1 }, true);
    actor2W.physicsBody?.getRigidBody()?.addTorque({ x: -0.5, y: -0.01, z: 0.05 }, true);
    actor3W.physicsBody?.getRigidBody()?.addTorque({ x: 0.01, y: 5, z: -0.05 }, true);

    const actor1Position: Vector3 = actor1W.drive.getPosition();
    cameraW.lookAt(actor1Position);
    cameraW.drive.default.setY(actor1Position.y);

    physicsWorldService.getDebugRenderer(loopService).start();

    loopService.tick$.subscribe(() => {
      actor3W.physicsBody?.getRigidBody()?.setAngvel({ x: 0, y: 3, z: 1 }, true);
      cameraW.drive.default.setY(actor1W.drive.getPosition().y);
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
