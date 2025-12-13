import type { Collider, RigidBody, Vector } from '@dimforge/rapier3d';
import { ColliderDesc, RigidBodyDesc, World } from '@dimforge/rapier3d';
import type { Scene } from 'three';
import { BufferAttribute, BufferGeometry, LineBasicMaterial, LineSegments } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TSceneWrapper, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { loopService } = engine.services;
  const { actorService } = space.services;

  const gravity = { x: 0.0, y: -9.81, z: 0.0 };
  const world: World = new World(gravity);

  const sceneWrapper: TSceneWrapper = actorService.getScene();
  const rapierDebugRenderer: RapierDebugRenderer = new RapierDebugRenderer(sceneWrapper.entity, world);

  // Create the ground
  const groundColliderDesc: ColliderDesc = ColliderDesc.cuboid(10.0, 0.1, 10.0);
  world.createCollider(groundColliderDesc);

  // Create a dynamic rigid-body.
  const rigidBodyDesc: RigidBodyDesc = RigidBodyDesc.dynamic().setTranslation(0.0, 1.0, 0.0);
  const rigidBody: RigidBody = world.createRigidBody(rigidBodyDesc);

  // Create a cuboid collider attached to the dynamic rigidBody.
  const colliderDesc: ColliderDesc = ColliderDesc.cuboid(0.5, 0.5, 0.5);
  const collider: Collider = world.createCollider(colliderDesc, rigidBody);

  loopService.tick$.subscribe(({ delta }) => {
    // Ste the simulation forward.
    world.step();

    // Get and print the rigid-body's position.
    const position: Vector = rigidBody.translation();
    console.log('Rigid-body position: ', position.x, position.y, position.z);

    rapierDebugRenderer.update();
  });

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
  world: World;
  enabled: boolean = true;

  constructor(scene: Scene, world: World) {
    this.world = world;
    this.mesh = new LineSegments(new BufferGeometry(), new LineBasicMaterial({ color: 0xffffff, vertexColors: true }));
    this.mesh.frustumCulled = false;
    scene.add(this.mesh);
  }

  update(): void {
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
