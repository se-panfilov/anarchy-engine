import type {
  TActor,
  TActorService,
  TAnyMaterialWrapper,
  TBoxGeometryParams,
  TMaterialService,
  TMeters,
  TModel3d,
  TModels3dService,
  TObject3DParams,
  TPhysicsBody,
  TPhysicsBodyService,
  TSpatialGridWrapper
} from '@Anarchy/Engine';
import { CollisionShape, MaterialType, meters, PrimitiveModel3dType, RigidBodyTypesNames, TransformAgent } from '@Anarchy/Engine';
import type { Vector3Like } from 'three';
import { Euler, Quaternion, Vector3 } from 'three';

import { BULLET_TARGET_TAG } from '@/Levels/Showcase20PhysicsShooter/utils/Bullets';

export type TBuidingBlock = Required<Pick<TBoxGeometryParams, 'height' | 'width' | 'depth'>> & Required<Pick<TObject3DParams, 'position'>>;

export function buildTower(
  actorService: TActorService,
  models3dService: TModels3dService,
  materialService: TMaterialService,
  physicsBodyService: TPhysicsBodyService,
  startCoords: Pick<Vector3Like, 'x' | 'z'>,
  rows: number,
  cols: number,
  levels: number,
  grid: TSpatialGridWrapper
): ReadonlyArray<TActor> {
  const blocks: ReadonlyArray<TBuidingBlock> = getBlocks(startCoords, rows, cols, levels);

  console.log('number of blocks:', blocks.length);
  const material: TAnyMaterialWrapper = materialService.create({
    name: 'building_block_material',
    type: MaterialType.Standard,
    options: { color: '#8FAA8F' }
  });

  return blocks.map((block: TBuidingBlock): TActor => {
    const model3d: TModel3d = models3dService.create({
      name: `block_${block.position.x}_${block.position.y}_${block.position.z}_model3d`,
      model3dSource: PrimitiveModel3dType.Cube,
      animationsSource: [],
      material,
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
      rotation: new Euler()
    });

    const physicsBody: TPhysicsBody = physicsBodyService.create({
      name: `block_physic_body_${block.position.x}_${block.position.y}_${block.position.z}_model3d`,
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
      position: block.position,
      rotation: new Quaternion()
    });

    return actorService.create({
      name: `block_${block.position.x}_${block.position.y}_${block.position.z}_actor`,
      model3dSource: model3d,
      agent: TransformAgent.Physics,
      physicsBody,
      position: block.position,
      rotation: new Euler(),
      spatial: { isAutoUpdate: true, grid },
      tags: ['physics_block', BULLET_TARGET_TAG]
    });
  });
}

function getBlocks(startCoords: Pick<Vector3Like, 'x' | 'z'>, rows: number, cols: number, levels: number): ReadonlyArray<TBuidingBlock> {
  let blocks: ReadonlyArray<TBuidingBlock> = [];
  // const gap: number = 0.1;
  const width: TMeters = meters(1);
  const height: TMeters = meters(1);
  const depth: TMeters = meters(1);

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
