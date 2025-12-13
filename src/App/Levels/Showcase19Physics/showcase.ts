import RAPIER from '@dimforge/rapier3d';
import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { loopService } = engine.services;
  // const { particlesService } = space.services;

  let gravity = { x: 0.0, y: -9.81, z: 0.0 };
  let world = new RAPIER.World(gravity);

  // Create the ground
  let groundColliderDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.1, 10.0);
  world.createCollider(groundColliderDesc);

  // Create a dynamic rigid-body.
  let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(0.0, 1.0, 0.0);
  let rigidBody = world.createRigidBody(rigidBodyDesc);

  // Create a cuboid collider attached to the dynamic rigidBody.
  let colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
  let collider = world.createCollider(colliderDesc, rigidBody);

  // Game loop. Replace by your own game loop system.
  let gameLoop = () => {
    // Ste the simulation forward.
    world.step();

    // Get and print the rigid-body's position.
    let position = rigidBody.translation();
    console.log('Rigid-body position: ', position.x, position.y, position.z);

    setTimeout(gameLoop, 16);
  };

  gameLoop();

  // initRapier.then((rapier) => {
  //   console.log(rapier);
  // });

  loopService.tick$.subscribe(({ delta }) => {});

  async function init(): Promise<void> {
    // TODO (S.Panfilov)
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
