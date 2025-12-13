import type { TShowcase } from '@/App/Levels/Models';
import type { TActorWrapperAsync, TActorWrapperWithPhysicsAsync, TAppCanvas, TCameraWrapper, TEngine, TSpace, TSpaceConfig, TVector3Wrapper } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined, Vector3Wrapper } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { actorService, cameraService, loopService, physicsWorldService } = space.services;

  const actorAsyncRegistry = actorService.getRegistry();

  async function init(): Promise<void> {
    const actor1Promise: Promise<TActorWrapperAsync | undefined> = actorAsyncRegistry.findByNameAsync('actor_1');
    const actor2Promise: Promise<TActorWrapperAsync | undefined> = actorAsyncRegistry.findByNameAsync('actor_2');
    const actor3Promise: Promise<TActorWrapperAsync | undefined> = actorAsyncRegistry.findByNameAsync('actor_3');

    const actor1W: TActorWrapperWithPhysicsAsync | TActorWrapperAsync | undefined = await actor1Promise;
    if (isNotDefined(actor1W)) throw new Error(`Cannot find "actor_1" actor`);

    const actor2W: TActorWrapperWithPhysicsAsync | TActorWrapperAsync | undefined = await actor2Promise;
    if (isNotDefined(actor2W)) throw new Error(`Cannot find "actor_2" actor`);

    const actor3W: TActorWrapperWithPhysicsAsync | TActorWrapperAsync | undefined = await actor3Promise;
    if (isNotDefined(actor3W)) throw new Error(`Cannot find "actor_3" actor`);

    const cameraW: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(cameraW)) throw new Error(`Cannot find active camera`);

    actor1W.physicsBody?.getRigidBody()?.addTorque({ x: -0.2, y: 0.5, z: 1 }, true);
    actor2W.physicsBody?.getRigidBody()?.addTorque({ x: -0.5, y: -0.01, z: 0.05 }, true);
    actor3W.physicsBody?.getRigidBody()?.addTorque({ x: 0.01, y: 5, z: -0.05 }, true);

    const actor1Position: TVector3Wrapper = actor1W.getPosition();
    cameraW.lookAt(Vector3Wrapper(actor1Position.getCoords()));
    cameraW.setY(actor1Position.getY());

    physicsWorldService.getDebugRenderer(loopService).start();

    loopService.tick$.subscribe(() => {
      actor3W.physicsBody?.getRigidBody()?.setAngvel({ x: 0, y: 3, z: 1 }, true);
      cameraW.setY(actor1W.getPosition().getY());
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
