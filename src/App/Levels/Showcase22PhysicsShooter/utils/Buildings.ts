import { Euler, Vector3 } from 'three';

import type { TActorService, TActorWrapperWithPhysics, TBoxGeometryProps, TMaterialService, TModel3dFacade, TModels3dService, TObject3DParams, TSpatialGridWrapper, TWithCoordsXZ } from '@/Engine';
import { CollisionShape, MaterialType, PrimitiveModel3dType, RigidBodyTypesNames } from '@/Engine';

export type TBuidingBlock = Required<Pick<TBoxGeometryProps, 'height' | 'width' | 'depth'>> & Required<Pick<TObject3DParams, 'position'>>;

export async function buildTower(
  actorService: TActorService,
  models3dService: TModels3dService,
  materialService: TMaterialService,
  startCoords: TWithCoordsXZ,
  rows: number,
  cols: number,
  levels: number,
  grid: TSpatialGridWrapper
): Promise<ReadonlyArray<TActorWrapperWithPhysics>> {
  const blocks: ReadonlyArray<TBuidingBlock> = getBlocks(startCoords, rows, cols, levels);

  console.log('number of blocks:', blocks.length);
  const materialW = materialService.create({ name: 'building_block_material', type: MaterialType.Standard, options: { color: '#8FAA8F' } });

  const result: ReadonlyArray<TActorWrapperWithPhysics> = blocks.map((block: TBuidingBlock): TActorWrapperWithPhysics => {
    const model3dF: TModel3dFacade = models3dService.create({
      name: `block_${block.position.x}_${block.position.y}_${block.position.z}_model3d`,
      model3dSource: PrimitiveModel3dType.Cube,
      animationsSource: [],
      materialSource: materialW,
      options: {
        width: block.width,
        height: block.height,
        depth: block.depth,
        widthSegments: 1,
        heightSegments: 1
      },
      castShadow: true,
      receiveShadow: false,
      position: block.position,
      rotation: new Euler(0, 0, 0)
    });

    return actorService.create({
      name: `block_${block.position.x}_${block.position.y}_${block.position.z}_actor`,
      model3dSource: model3dF,
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
      rotation: new Euler(0, 0, 0),
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
            position: new Vector3(
              // startCoords.x + i * (width + gap),
              // k * (height + gap / 4),
              // startCoords.z + j * (depth + gap)
              startCoords.x + i * width,
              k * height,
              startCoords.z + j * depth
            )
          }
        ];
      }
    }
  }

  return blocks;
}
