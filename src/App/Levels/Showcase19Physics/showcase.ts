import type { Rotation, Vector } from '@dimforge/rapier3d';
import { ColliderDesc, RigidBodyDesc, World } from '@dimforge/rapier3d';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActorWrapperAsync, TAppCanvas, TEngine, TPhysicsDebugRenderer, TSceneWrapper, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined, PhysicsDebugRenderer, STANDARD_GRAVITY } from '@/Engine';
import { meters } from '@/Engine/Measurements/Utils';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { loopService } = engine.services;
  const { actorService } = space.services;

  const actorAsyncRegistry = actorService.getRegistry();
  const sceneWrapper: TSceneWrapper = actorService.getScene();

  const ballActorPromise: Promise<TActorWrapperAsync | undefined> = actorAsyncRegistry.findByNameAsync('ball');

  const world: World = new World(STANDARD_GRAVITY);
  const physicsDebugRenderer: TPhysicsDebugRenderer = PhysicsDebugRenderer(sceneWrapper.entity, world);

  const rigidBodyDesc = RigidBodyDesc.dynamic()
    .setTranslation(0, 5, 0) //should take the position of the actor
    .setLinvel(2, 0, 0);
  const rigidBody = world.createRigidBody(rigidBodyDesc);
  const colliderDesc = ColliderDesc.ball(meters(1));
  world.createCollider(colliderDesc, rigidBody);

  // Create the ground
  const groundColliderDesc: ColliderDesc = ColliderDesc.cuboid(10.0, 0.1, 10.0);
  world.createCollider(groundColliderDesc);

  async function init(): Promise<void> {
    const ball: TActorWrapperAsync | undefined = await ballActorPromise;
    if (isNotDefined(ball)) throw new Error(`Cannot find ball actor`);

    // TODO (S.Panfilov) extract physics world update to  the main loop
    loopService.tick$.subscribe(({ delta }) => {
      // Ste the simulation forward.
      world.step();

      // Get and print the rigid-body's position.
      const position: Vector = rigidBody.translation();
      const rotation: Rotation = rigidBody.rotation();

      // Обновляем позицию и ориентацию 3D модели
      ball.entity.position.set(position.x, position.y, position.z);
      ball.entity.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);

      physicsDebugRenderer.update();
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
