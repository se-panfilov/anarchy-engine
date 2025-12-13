import type { TActorParams, TActorService, TActorWrapperWithPhysics, TSpatialGridWrapper, TWithCoordsXZ } from '@/Engine';
import { CollisionShape, MaterialType, PrimitiveModel3dType, RigidBodyTypesNames, Vector3Wrapper } from '@/Engine';

export type TBuidingBlock = Required<Pick<TActorParams, 'height' | 'width' | 'depth' | 'position'>>;

export async function buildTower(
  actorService: TActorService,
  startCoords: TWithCoordsXZ,
  rows: number,
  cols: number,
  levels: number,
  grid: TSpatialGridWrapper
): Promise<ReadonlyArray<TActorWrapperWithPhysics>> {
  const blocks: ReadonlyArray<TBuidingBlock> = getBlocks(startCoords, rows, cols, levels);

  console.log('number of blocks:', blocks.length);

  const result = blocks.map((block: TBuidingBlock): TActorWrapperWithPhysics => {
    return actorService.create({
      name: `block_${block.position.getX()}_${block.position.getY()}_${block.position.getZ()}`,
      model3d: { url: PrimitiveModel3dType.Cube },
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
        isSleep: true,
        shapeParams: {
          hx: block.width / 2,
          hy: block.height / 2,
          hz: block.depth / 2
        },
        position: block.position
      },
      position: block.position,
      castShadow: true,
      spatial: { isAutoUpdate: true, grid },
      tags: ['physics_block']
    }) as TActorWrapperWithPhysics;
  });

  return await Promise.all(result);
}

function getBlocks(startCoords: TWithCoordsXZ, rows: number, cols: number, levels: number): ReadonlyArray<TBuidingBlock> {
  let blocks: ReadonlyArray<TBuidingBlock> = [];
  // const gap: number = 0.1;
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
              // x: startCoords.x + i * (width + gap),
              // y: k * (height + gap / 4),
              // z: startCoords.z + j * (depth + gap)
              x: startCoords.x + i * width,
              y: k * height,
              z: startCoords.z + j * depth
            })
          }
        ];
      }
    }
  }

  return blocks;
}
