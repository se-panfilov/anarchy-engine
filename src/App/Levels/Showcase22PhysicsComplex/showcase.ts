import type { RigidBody, World } from '@dimforge/rapier3d';
import { ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d';
import type { Vector } from '@dimforge/rapier3d/math';
import { Vector3 } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined, KeysExtra } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const { physicsLoopService, physicsWorldService, loopService } = space.services;

  async function init(): Promise<void> {
    physicsWorldService.getDebugRenderer(loopService).start();

    const wold: World | undefined = physicsWorldService.getWorld();
    if (isNotDefined(wold)) throw new Error('World is not defined');
    buildKevaTower(wold);

    keyboardService.onKey(KeysExtra.Space).pressed$.subscribe((): void => physicsLoopService.shouldAutoUpdate(!physicsLoopService.isAutoUpdate()));
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}

function buildKevaTower(world: World): void {
  const halfExtents: Vector3 = new Vector3(0.1, 0.5, 2.0);
  let blockHeight: number = 0.0;
  // These should only be set to odd values otherwise
  // the blocks won't align in the nicest way.
  const numyArr: ReadonlyArray<number> = [0, 3, 5, 5, 7, 9];
  let i: number;

  for (i = 5; i >= 1; --i) {
    const numx: number = i;
    const numy: number = numyArr[i];
    const numz: number = numx * 3 + 1;
    const blockWidth: number = numx * halfExtents.z * 2.0;
    buildBlock(world, halfExtents, new Vector3(-blockWidth / 2.0, blockHeight, -blockWidth / 2.0), numx, numy, numz);
    blockHeight += numy * halfExtents.y * 2.0 + halfExtents.x * 2.0;
  }
}

function buildBlock(world: World, halfExtents: Vector, shift: Vector, numX: number, numY: number, numZ: number): void {
  const half_extents_zyx: Vector = {
    x: halfExtents.z,
    y: halfExtents.y,
    z: halfExtents.x
  };

  const dimensions: ReadonlyArray<Vector> = [halfExtents, half_extents_zyx];
  const blockWidth: number = 2.0 * halfExtents.z * numX;
  const blockHeight: number = 2.0 * halfExtents.y * numY;
  const spacing: number = (halfExtents.z * numX - halfExtents.x) / (numZ - 1.0);

  let i: number;
  let j: number;
  let k: number;

  for (i = 0; i < numY; ++i) {
    [numX, numZ] = [numZ, numX];
    const dim: Vector = dimensions[i % 2];
    const y: number = dim.y * i * 2.0;

    for (j = 0; j < numX; ++j) {
      const x: number = i % 2 == 0 ? spacing * j * 2.0 : dim.x * j * 2.0;

      for (k = 0; k < numZ; ++k) {
        const z: number = i % 2 == 0 ? dim.z * k * 2.0 : spacing * k * 2.0;
        // Build the rigid body.
        const bodyDesc: RigidBodyDesc = RigidBodyDesc.dynamic().setTranslation(x + dim.x + shift.x, y + dim.y + shift.y, z + dim.z + shift.z);
        const body: RigidBody = world.createRigidBody(bodyDesc);
        const colliderDesc: ColliderDesc = ColliderDesc.cuboid(dim.x, dim.y, dim.z);
        world.createCollider(colliderDesc, body);
      }
    }
  }

  // Close the top.
  const dim: Vector = { x: halfExtents.z, y: halfExtents.x, z: halfExtents.y };

  for (i = 0; i < blockWidth / (dim.x * 2.0); ++i) {
    for (j = 0; j < blockWidth / (dim.z * 2.0); ++j) {
      // Build the rigid body.
      const bodyDesc: RigidBodyDesc = RigidBodyDesc.dynamic().setTranslation(i * dim.x * 2.0 + dim.x + shift.x, dim.y + shift.y + blockHeight, j * dim.z * 2.0 + dim.z + shift.z);
      const body: RigidBody = world.createRigidBody(bodyDesc);
      const colliderDesc: ColliderDesc = ColliderDesc.cuboid(dim.x, dim.y, dim.z);
      world.createCollider(colliderDesc, body);
    }
  }
}
