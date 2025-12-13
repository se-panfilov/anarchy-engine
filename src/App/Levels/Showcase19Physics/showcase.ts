import RAPIER from '@dimforge/rapier3d';
import type { Scene } from 'three';
import { BufferAttribute, BufferGeometry, LineBasicMaterial, LineSegments } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { loopService } = engine.services;
  const { actorService } = space.services;

  const gravity = { x: 0.0, y: -9.81, z: 0.0 };
  const world = new RAPIER.World(gravity);

  // const { vertices, colors } = world.debugRender()

  const scene = actorService.getScene();
  const rapierDebugRenderer = new RapierDebugRenderer(scene.entity, world);

  // Create the ground
  const groundColliderDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.1, 10.0);
  world.createCollider(groundColliderDesc);

  // Create a dynamic rigid-body.
  const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(0.0, 1.0, 0.0);
  const rigidBody = world.createRigidBody(rigidBodyDesc);

  // Create a cuboid collider attached to the dynamic rigidBody.
  const colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
  const collider = world.createCollider(colliderDesc, rigidBody);

  // Game loop. Replace by your own game loop system.
  const gameLoop = () => {
    // Ste the simulation forward.
    world.step();

    // Get and print the rigid-body's position.
    const position = rigidBody.translation();
    console.log('Rigid-body position: ', position.x, position.y, position.z);

    rapierDebugRenderer.update();
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

class RapierDebugRenderer {
  mesh;
  world;
  enabled = true;

  constructor(scene: Scene, world: RAPIER.World) {
    this.world = world;
    this.mesh = new LineSegments(new BufferGeometry(), new LineBasicMaterial({ color: 0xffffff, vertexColors: true }));
    this.mesh.frustumCulled = false;
    scene.add(this.mesh);
  }

  update() {
    if (this.enabled) {
      const { vertices, colors } = this.world.debugRender();
      this.mesh.geometry.setAttribute('position', new BufferAttribute(vertices, 3));
      this.mesh.geometry.setAttribute('color', new BufferAttribute(colors, 4));
      this.mesh.visible = true;
    } else {
      this.mesh.visible = false;
    }
  }
}
