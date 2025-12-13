import type { RigidBody, World } from '@dimforge/rapier3d';
import { ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d';

import { meters } from '@/Engine/Measurements/Utils';
import { CollisionShape } from '@/Engine/Physics/Constants';
import {
  TPhysicsBodyBallParams,
  TPhysicsBodyCapsuleParams,
  TPhysicsBodyConeParams,
  TPhysicsBodyConvexPolyhedronParams,
  TPhysicsBodyCuboidParams,
  TPhysicsBodyCylinderParams,
  TPhysicsBodyHalfSpaceParams,
  TPhysicsBodyHeightfieldParams,
  TPhysicsBodyParams,
  TPhysicsBodyPolylineParams,
  TPhysicsBodyRoundConeParams,
  TPhysicsBodyRoundCuboidParams,
  TPhysicsBodyRoundCylinderParams,
  TPhysicsBodyRoundTriangleParams,
  TPhysicsBodySegmentParams,
  TPhysicsBodyTriangleParams,
  TPhysicsBodyTriMeshParams,
  TPhysicsPresetParams,
  TPolyhedronPhysicsBodyRoundConvexPolyhedronParams
} from '@/Engine/Physics/Models';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function createPhysicsBody(world: World, params: TPhysicsPresetParams): RigidBody {
  const rigidBodyDesc: RigidBodyDesc = RigidBodyDesc[params.type]();
  if (isDefined(params.position)) rigidBodyDesc.setTranslation(params.position.x, params.position.y, params.position.z);
  const rigidBody: RigidBody = world.createRigidBody(rigidBodyDesc);
  // const colliderDesc: ColliderDesc = ColliderDesc.ball(meters(size));
  world.createCollider(colliderDesc, rigidBody);

  return rigidBody;
}

export function getColliderDesc(params: TPhysicsPresetParams): ColliderDesc {
  const colliderDesc: ColliderDesc = ColliderDesc[params.type]();
  if (isDefined(params.size)) colliderDesc.setHalfExtents(params.size.x, params.size.y, params.size.z);
  return colliderDesc;
}

// TODO (S.Panfilov) add unit tests
export function getParamsByColliderType(params: TPhysicsPresetParams): TPhysicsBodyParams | never {
  const { collisionShape, shapeParams } = params;
  const { a, b, c, borderRadius, nrows, ncols, normal, heights, scale, halfHeight, flags, radius, hx, hy, hz, vertices, indices } = shapeParams;
  switch (collisionShape) {
    case CollisionShape.Ball:
      if (isNotDefined(radius)) throw new Error(`Collider shape is "${collisionShape}" but "radius" is not defined`);
      return { radius } satisfies TPhysicsBodyBallParams;
    case CollisionShape.Cuboid:
      if (isNotDefined(hx) || isNotDefined(hy) || isNotDefined(hz)) throw new Error(`Collider shape is "${collisionShape}" but "hx"(${hx}), "hy"(${hy}), or "hz"(${hz}) are not defined`);
      return { hx, hy, hz } satisfies TPhysicsBodyCuboidParams;
    case CollisionShape.Capsule:
      if (isNotDefined(halfHeight) || isNotDefined(radius)) throw new Error(`Collider shape is "${collisionShape}" but "halfHeight"(${halfHeight}) or "radius"(${radius}) are not defined`);
      return { halfHeight, radius } satisfies TPhysicsBodyCapsuleParams;
    case CollisionShape.Segment:
      if (isNotDefined(a) || isNotDefined(b)) throw new Error(`Collider shape is "${collisionShape}" but "a"(${a}) or "b"(${b}) are not defined`);
      return { a, b } satisfies TPhysicsBodySegmentParams;
    case CollisionShape.Polyline:
      if (isNotDefined(vertices) || isNotDefined(indices)) throw new Error(`Collider shape is "${collisionShape}" but "vertices"(${vertices}) are not defined`);
      return { vertices, indices } satisfies TPhysicsBodyPolylineParams;
    case CollisionShape.Triangle:
      if (isNotDefined(a) || isNotDefined(b) || isNotDefined(c)) throw new Error(`Collider shape is "${collisionShape}" but "a"(${a}), "b"(${b}), or "c"(${c}) are not defined`);
      return { a, b, c } satisfies TPhysicsBodyTriangleParams;
    case CollisionShape.TriMesh:
      if (isNotDefined(vertices) || isNotDefined(indices)) throw new Error(`Collider shape is "${collisionShape}" but "vertices"(${vertices}) or "indices"(${indices}) are not defined`);
      return { vertices, indices, flags } satisfies TPhysicsBodyTriMeshParams;
    case CollisionShape.HeightField:
      if (isNotDefined(nrows) || isNotDefined(ncols) || isNotDefined(heights) || isNotDefined(scale))
        throw new Error(`Collider shape is "${collisionShape}" but "nrows"(${nrows}), "ncols"(${ncols}), "heights"(${heights}), or "scale"(${scale}) are not defined`);
      return { nrows, ncols, heights, scale, flags } satisfies TPhysicsBodyHeightfieldParams;
    case CollisionShape.Compound:
      throw new Error(`Collider shape is "${collisionShape}" but it is not supported yet`);
    case CollisionShape.ConvexPolyhedron:
      if (isNotDefined(vertices) || isNotDefined(indices)) throw new Error(`Collider shape is "${collisionShape}" but "vertices"(${vertices}) or "indices"(${indices}) are not defined`);
      return { vertices, indices } satisfies TPhysicsBodyConvexPolyhedronParams;
    case CollisionShape.Cylinder:
      if (isNotDefined(halfHeight) || isNotDefined(radius)) throw new Error(`Collider shape is "${collisionShape}" but "halfHeight"(${halfHeight}) or "radius"(${radius}) are not defined`);
      return { halfHeight, radius } satisfies TPhysicsBodyCylinderParams;
    case CollisionShape.Cone:
      if (isNotDefined(halfHeight) || isNotDefined(radius)) throw new Error(`Collider shape is "${collisionShape}" but "halfHeight"(${halfHeight}) or "radius"(${radius}) are not defined`);
      return { halfHeight, radius } satisfies TPhysicsBodyConeParams;
    case CollisionShape.RoundCuboid:
      if (isNotDefined(hx) || isNotDefined(hy) || isNotDefined(hz) || isNotDefined(radius))
        throw new Error(`Collider shape is "${collisionShape}" but "hx"(${hx}), "hy"(${hy}), "hz"(${hz}), or "radius"(${radius}) are not defined`);
      return { hx, hy, hz, borderRadius } satisfies TPhysicsBodyRoundCuboidParams;
    case CollisionShape.RoundTriangle:
      if (isNotDefined(a) || isNotDefined(b) || isNotDefined(c) || isNotDefined(radius))
        throw new Error(`Collider shape is "${collisionShape}" but "a"(${a}), "b"(${b}), "c"(${c}), or "radius"(${radius}) are not defined`);
      return { a, b, c, borderRadius } satisfies TPhysicsBodyRoundTriangleParams;
    case CollisionShape.RoundCylinder:
      if (isNotDefined(halfHeight) || isNotDefined(radius) || isNotDefined(borderRadius))
        throw new Error(`Collider shape is "${collisionShape}" but "halfHeight"(${halfHeight}), "radius"(${radius}), or "borderRadius"(${borderRadius}) are not defined`);
      return { halfHeight, radius, borderRadius } satisfies TPhysicsBodyRoundCylinderParams;
    case CollisionShape.RoundCone:
      if (isNotDefined(halfHeight) || isNotDefined(radius) || isNotDefined(borderRadius))
        throw new Error(`Collider shape is "${collisionShape}" but "halfHeight"(${halfHeight}), "radius"(${radius}), or "borderRadius"(${borderRadius}) are not defined`);
      return { halfHeight, radius, borderRadius } satisfies TPhysicsBodyRoundConeParams;
    case CollisionShape.RoundConvexPolyhedron:
      if (isNotDefined(vertices) || isNotDefined(indices) || isNotDefined(borderRadius))
        throw new Error(`Collider shape is "${collisionShape}" but "vertices"(${vertices}), "indices"(${indices}), or "borderRadius"(${borderRadius}) are not defined`);
      return { vertices, indices, borderRadius } satisfies TPolyhedronPhysicsBodyRoundConvexPolyhedronParams;
    case CollisionShape.HalfSpace:
      if (isNotDefined(normal)) throw new Error(`Collider shape is "${collisionShape}" but "normal" is not defined`);
      return { normal } satisfies TPhysicsBodyHalfSpaceParams;
    default:
      throw new Error(`Unknown collider type: ${type}`);
  }
}
