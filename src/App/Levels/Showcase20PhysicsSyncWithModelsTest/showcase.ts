import type { TShowcase } from '@/App/Levels/Models';
import type { TActorWrapperAsync, TActorWrapperWithPhysicsAsync, TAppCanvas, TCameraWrapper, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { actorService, cameraService, loopService, physicsBodyService } = space.services;

  const actorAsyncRegistry = actorService.getRegistry();

  const actor1Promise: Promise<TActorWrapperAsync | undefined> = actorAsyncRegistry.findByNameAsync('actor_1');
  const actor2Promise: Promise<TActorWrapperAsync | undefined> = actorAsyncRegistry.findByNameAsync('actor_2');
  const actor3Promise: Promise<TActorWrapperAsync | undefined> = actorAsyncRegistry.findByNameAsync('actor_3');

  physicsBodyService.getDebugRenderer(loopService).start();

  async function init(): Promise<void> {
    const actor1W: TActorWrapperWithPhysicsAsync | TActorWrapperAsync | undefined = await actor1Promise;
    if (isNotDefined(actor1W)) throw new Error(`Cannot find "actor_1" actor`);

    const actor2W: TActorWrapperWithPhysicsAsync | TActorWrapperAsync | undefined = await actor2Promise;
    if (isNotDefined(actor2W)) throw new Error(`Cannot find "actor_2" actor`);

    const actor3W: TActorWrapperWithPhysicsAsync | TActorWrapperAsync | undefined = await actor3Promise;
    if (isNotDefined(actor3W)) throw new Error(`Cannot find "actor_3" actor`);

    const cameraW: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(cameraW)) throw new Error(`Cannot find active camera`);

    // actor1W.physicsBody?.getRigidBody()?.addForce({ x: 0, y: 0, z: 0.001 }, true);
    actor2W.physicsBody?.getRigidBody()?.addTorque({ x: -0.05, y: -0.01, z: 0.05 }, true);
    actor3W.physicsBody?.getRigidBody()?.addTorque({ x: 0.01, y: 0.1, z: -0.05 }, true);

    // TODO (S.Panfilov) extract physics world update to the main loop
    loopService.tick$.subscribe(() => {
      cameraW.lookAt(actor1W.getPosition());
      cameraW.setY(actor1W.getPosition().getY());

      // TODO (S.Panfilov) debug: this should not be done here, but instead in the service (with an option to manual update)
      // const world = physicsBodyService.getWorld();
      // if (isNotDefined(world)) throw new Error(`Cannot find physics world`);
      // world.step();
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
