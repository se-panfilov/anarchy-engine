import type { World } from '@dimforge/rapier3d';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActorParams, TActorService, TActorWrapperWithPhysicsAsync, TAppCanvas, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { ActorType, buildSpaceFromConfig, CollisionShape, Engine, isNotDefined, KeysExtra, MaterialType, RigidBodyTypesNames, Vector3Wrapper } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const { physicsLoopService, physicsWorldService, actorService, loopService, controlsService } = space.services;

  async function init(): Promise<void> {
    physicsWorldService.getDebugRenderer(loopService).start();

    controlsService.findActive()?.entity.target.set(0, 10, 0);

    physicsLoopService.shouldAutoUpdate(false);
    await buildTower(actorService, 10, 10, 20);

    physicsLoopService.shouldAutoUpdate(true);

    keyboardService.onKey(KeysExtra.Space).pressed$.subscribe((): void => physicsLoopService.shouldAutoUpdate(!physicsLoopService.isAutoUpdate()));
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}

async function buildTower(actorService: TActorService, rows: number, cols: number, levels: number): Promise<ReadonlyArray<TActorWrapperWithPhysicsAsync>> {
  const blocks: ReadonlyArray<Required<Pick<TActorParams, 'height' | 'width' | 'depth' | 'position'>>> = getBlocks(rows, cols, levels);

  console.log('number of blocks:', blocks.length);

  const result = blocks.map((block: Required<Pick<TActorParams, 'height' | 'width' | 'depth' | 'position'>>): Promise<TActorWrapperWithPhysicsAsync> => {
    return actorService.createAsync({
      // name: `block-${i}-${j}`,
      type: ActorType.Cube,
      width: block.width,
      height: block.height,
      depth: block.depth,
      material: { type: MaterialType.Standard, params: { color: '#8FAA8F' } },
      physics: {
        type: RigidBodyTypesNames.Dynamic,
        collisionShape: CollisionShape.Cuboid,
        mass: 1,
        friction: 0.5,
        restitution: 0,
        shapeParams: {
          hx: block.width / 2,
          hy: block.height / 2,
          hz: block.depth / 2
        },
        position: block.position
      },
      position: block.position,
      castShadow: true,
      tags: []
    }) as Promise<TActorWrapperWithPhysicsAsync>;
  });

  return await Promise.all(result);
}

function getBlocks(rows: number, cols: number, levels: number): ReadonlyArray<Required<Pick<TActorParams, 'height' | 'width' | 'depth' | 'position'>>> {
  let blocks: ReadonlyArray<Required<Pick<TActorParams, 'height' | 'width' | 'depth' | 'position'>>> = [];
  const gap: number = 0.1;
  const width: number = 1;
  const height: number = 1;
  const depth: number = 1;

  // eslint-disable-next-line functional/no-loop-statements
  for (let i: number = 0; i < rows; i++) {
    // eslint-disable-next-line functional/no-loop-statements
    for (let j: number = 0; j < cols; j++) {
      // eslint-disable-next-line functional/no-loop-statements
      for (let k: number = 0; k < levels; k++) {
        blocks = [
          ...blocks,
          {
            width,
            height,
            depth,
            position: Vector3Wrapper({
              x: i * (width + gap),
              y: k * (height + gap / 4),
              z: j * (depth + gap)
            })
          }
        ];
      }
    }
  }

  return blocks;
}
