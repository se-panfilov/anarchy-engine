import type { World } from '@dimforge/rapier3d';
import type { Vector } from '@dimforge/rapier3d/math';
import { Vector3 } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActorService, TAppCanvas, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { ActorType, buildSpaceFromConfig, CollisionShape, Engine, isNotDefined, KeysExtra, MaterialType, RigidBodyTypesNames, Vector3Wrapper } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const { physicsLoopService, physicsWorldService, actorService, controlsService } = space.services;

  function init(): void {
    // physicsWorldService.getDebugRenderer(loopService).start();

    controlsService.findActive()?.entity.target.set(0, 10, 0);

    const wold: World | undefined = physicsWorldService.getWorld();
    if (isNotDefined(wold)) throw new Error('World is not defined');
    void buildKevaTower(actorService);

    keyboardService.onKey(KeysExtra.Space).pressed$.subscribe((): void => physicsLoopService.shouldAutoUpdate(!physicsLoopService.isAutoUpdate()));
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}

async function buildKevaTower(actorService: TActorService): Promise<void> {
  const halfExtents: Vector3 = new Vector3(0.1, 0.5, 2.0);
  let blockHeight: number = 0.0;
  // These should only be set to odd values otherwise
  // the blocks won't align in the nicest way.
  const numyArr: ReadonlyArray<number> = [0, 3, 5, 5, 7, 9];
  let i: number;

  // eslint-disable-next-line functional/no-loop-statements
  for (i = 5; i >= 1; --i) {
    const numX: number = i;
    const numY: number = numyArr[i];
    const numZ: number = numX * 3 + 1;
    const blockWidth: number = numX * halfExtents.z * 2.0;
    await buildBlock(halfExtents, new Vector3(-blockWidth / 2.0, blockHeight, -blockWidth / 2.0), numX, numY, numZ, actorService);
    blockHeight += numY * halfExtents.y * 2.0 + halfExtents.x * 2.0;
  }
}

async function buildBlock(halfExtents: Vector, shift: Vector, numX: number, numY: number, numZ: number, actorService: TActorService): Promise<void> {
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

  // eslint-disable-next-line functional/no-loop-statements
  for (i = 0; i < numY; ++i) {
    [numX, numZ] = [numZ, numX];
    const dim: Vector = dimensions[i % 2];
    const y: number = dim.y * i * 2.0;

    // eslint-disable-next-line functional/no-loop-statements
    for (j = 0; j < numX; ++j) {
      const x: number = i % 2 == 0 ? spacing * j * 2.0 : dim.x * j * 2.0;
      // eslint-disable-next-line functional/no-loop-statements
      for (k = 0; k < numZ; ++k) {
        // once = false;
        const z: number = i % 2 == 0 ? dim.z * k * 2.0 : spacing * k * 2.0;
        // Build the rigid body.
        await actorService.createAsync({
          name: `block-${i}-${j}`,
          type: ActorType.Cube,
          width: dim.x * 2,
          height: dim.y * 2,
          depth: dim.z * 2,
          material: { type: MaterialType.Standard, params: { color: '#8FAA8F' } },
          physics: {
            type: RigidBodyTypesNames.Dynamic,
            collisionShape: CollisionShape.Cuboid,
            shapeParams: {
              hx: dim.x,
              hy: dim.y,
              hz: dim.z
            },
            position: Vector3Wrapper({ x: x + dim.x + shift.x, y: y + dim.y + shift.y, z: z + dim.z + shift.z })
          },
          position: Vector3Wrapper({ x: x + dim.x + shift.x, y: y + dim.y + shift.y, z: z + dim.z + shift.z }),
          castShadow: true,
          tags: []
        });
      }
    }
  }

  // Close the top.
  const dim: Vector = { x: halfExtents.z, y: halfExtents.x, z: halfExtents.y };

  // eslint-disable-next-line functional/no-loop-statements
  for (i = 0; i < blockWidth / (dim.x * 2.0); ++i) {
    // eslint-disable-next-line functional/no-loop-statements
    for (j = 0; j < blockWidth / (dim.z * 2.0); ++j) {
      // Build the rigid body.
      await actorService.createAsync({
        name: `block-${i}-${j}`,
        type: ActorType.Cube,
        width: dim.x * 2,
        height: dim.y * 2,
        depth: dim.z * 2,
        material: { type: MaterialType.Standard, params: { color: '#8FAA8F' } },
        physics: {
          type: RigidBodyTypesNames.Dynamic,
          collisionShape: CollisionShape.Cuboid,
          shapeParams: {
            hx: dim.x,
            hy: dim.y,
            hz: dim.z
          },
          position: Vector3Wrapper({ x: i * dim.x * 2.0 + dim.x + shift.x, y: dim.y + shift.y + blockHeight, z: j * dim.z * 2.0 + dim.z + shift.z })
        },
        position: Vector3Wrapper({ x: i * dim.x * 2.0 + dim.x + shift.x, y: dim.y + shift.y + blockHeight, z: j * dim.z * 2.0 + dim.z + shift.z }),
        castShadow: true,
        tags: []
      });
    }
  }
}
