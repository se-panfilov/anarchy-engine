import type { RigidBody, World } from '@dimforge/rapier3d';
import { ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d';
import type { TriMeshFlags } from '@dimforge/rapier3d/geometry/shape';

import { coordsXYZToMeters, meters } from '@/Engine/Measurements/Utils';
import type { TWithCoordsXYZ } from '@/Engine/Mixins';
import { CollisionShape } from '@/Engine/Physics/Constants';
import type {
  TAllPhysicsBodyParams,
  TPhysicsBodyBallParams,
  TPhysicsBodyCapsuleParams,
  TPhysicsBodyCuboidParams,
  TPhysicsBodyHalfSpaceParams,
  TPhysicsBodyHeightfieldParams,
  TPhysicsBodyParams,
  TPhysicsBodyPolylineParams,
  TPhysicsBodyRoundTriangleParams,
  TPhysicsBodyTriangleParams,
  TPhysicsBodyTriMeshParams,
  TPhysicsPresetParams
} from '@/Engine/Physics/Models';
import type { TWithUndefined } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function createPhysicsBody(world: World, params: TPhysicsPresetParams): RigidBody {
  const rigidBodyDesc: RigidBodyDesc = RigidBodyDesc[params.type]();
  if (isDefined(params.position)) rigidBodyDesc.setTranslation(params.position.x, params.position.y, params.position.z);
  if (isDefined(params.rotation)) rigidBodyDesc.setRotation(params.rotation.x, params.rotation.y, params.rotation.z);
  const rigidBody: RigidBody = world.createRigidBody(rigidBodyDesc);
  const colliderDesc: ColliderDesc = getColliderDesc(params);
  world.createCollider(colliderDesc, rigidBody);

  return rigidBody;
}

// TODO (S.Panfilov) add unit tests
export function getColliderDesc(params: TPhysicsPresetParams): ColliderDesc | never {
  const { collisionShape, shapeParams } = params;
  const { a, b, c, borderRadius, nrows, ncols, normal, heights, scale, halfHeight, flags, radius, hx, hy, hz, vertices, indices } = paramsToMeters(shapeParams);

  // const fixedShapeParams = paramsToMeters(shapeParams);

  // const ballParams: TPhysicsBodyBallParams = { radius: (fixedShapeParams as TPhysicsBodyBallParams).radius };
  // const ballParams: TPhysicsBodyCapsuleParams = { radius };
  // const ballParams: TPhysicsBodyConeParams = { radius };
  // const ballParams: TPhysicsBodyConvexPolyhedronParams = { radius };
  // const ballParams: TPhysicsBodyCuboidParams = { radius };
  // const ballParams: TPhysicsBodyCylinderParams = { radius };
  // const ballParams: TPhysicsBodyHalfSpaceParams = { radius };
  // const ballParams: TPhysicsBodyHeightfieldParams = { radius };
  // const ballParams: TPhysicsBodyParams = { radius };
  // const ballParams: TPhysicsBodyPolylineParams = { radius };
  // const ballParams: TPhysicsBodyRoundConeParams = { radius };
  // const ballParams: TPhysicsBodyRoundCuboidParams = { radius };
  // const ballParams: TPhysicsBodyRoundCylinderParams = { radius };
  // const ballParams: TPhysicsBodyRoundTriangleParams = { radius };
  // const ballParams: TPhysicsBodySegmentParams = { radius };
  // const ballParams: TPhysicsBodyTriangleParams = { radius };
  // const ballParams: TPhysicsBodyTriMeshParams = { radius };
  // const ballParams: TPhysicsPresetParams = { radius };
  // const ballParams: TPolyhedronPhysicsBodyRoundConvexPolyhedronParams = { radius };

  switch (collisionShape) {
    case CollisionShape.Ball:
      if (isNotDefined(radius)) throw new Error(`Collider shape is "${collisionShape}" but "radius" is not defined`);
      return ColliderDesc[collisionShape](radius);
    case CollisionShape.Cuboid:
      if (isNotDefined(hx) || isNotDefined(hy) || isNotDefined(hz)) throw new Error(`Collider shape is "${collisionShape}" but "hx"(${hx}), "hy"(${hy}), or "hz"(${hz}) are not defined`);
      return ColliderDesc[collisionShape](hx, hy, hz);
    case CollisionShape.Capsule:
      if (isNotDefined(halfHeight) || isNotDefined(radius)) throw new Error(`Collider shape is "${collisionShape}" but "halfHeight"(${halfHeight}) or "radius"(${radius}) are not defined`);
      return ColliderDesc[collisionShape](halfHeight, radius);
    case CollisionShape.Segment:
      if (isNotDefined(a) || isNotDefined(b)) throw new Error(`Collider shape is "${collisionShape}" but "a"(${a}) or "b"(${b}) are not defined`);
      return ColliderDesc[collisionShape](a, b);
    case CollisionShape.Polyline:
      if (isNotDefined(vertices) || isNotDefined(indices)) throw new Error(`Collider shape is "${collisionShape}" but "vertices"(${vertices}) are not defined`);
      return ColliderDesc[collisionShape](vertices, indices);
    case CollisionShape.Triangle:
      if (isNotDefined(a) || isNotDefined(b) || isNotDefined(c)) throw new Error(`Collider shape is "${collisionShape}" but "a"(${a}), "b"(${b}), or "c"(${c}) are not defined`);
      return ColliderDesc[collisionShape](a, b, c);
    case CollisionShape.TriMesh:
      if (isNotDefined(vertices) || isNotDefined(indices)) throw new Error(`Collider shape is "${collisionShape}" but "vertices"(${vertices}) or "indices"(${indices}) are not defined`);
      return ColliderDesc[collisionShape](vertices, indices, flags);
    case CollisionShape.HeightField:
      if (isNotDefined(nrows) || isNotDefined(ncols) || isNotDefined(heights) || isNotDefined(scale))
        throw new Error(`Collider shape is "${collisionShape}" but "nrows"(${nrows}), "ncols"(${ncols}), "heights"(${heights}), or "scale"(${scale}) are not defined`);
      return ColliderDesc[collisionShape](nrows, ncols, heights, scale, flags);
    case CollisionShape.Compound:
      throw new Error(`Collider shape is "${collisionShape}" but it is not supported yet`);
    case CollisionShape.ConvexPolyhedron:
      throw new Error(`Collider shape is "${collisionShape}" but it is not supported yet`);
    // if (isNotDefined(vertices) || isNotDefined(indices)) throw new Error(`Collider shape is "${collisionShape}" but "vertices"(${vertices}) or "indices"(${indices}) are not defined`);
    // return ColliderDesc[collisionShape](vertices, indices);
    case CollisionShape.Cylinder:
      if (isNotDefined(halfHeight) || isNotDefined(radius)) throw new Error(`Collider shape is "${collisionShape}" but "halfHeight"(${halfHeight}) or "radius"(${radius}) are not defined`);
      return ColliderDesc[collisionShape](halfHeight, radius);
    case CollisionShape.Cone:
      if (isNotDefined(halfHeight) || isNotDefined(radius)) throw new Error(`Collider shape is "${collisionShape}" but "halfHeight"(${halfHeight}) or "radius"(${radius}) are not defined`);
      return ColliderDesc[collisionShape](halfHeight, radius);
    case CollisionShape.RoundCuboid:
      if (isNotDefined(hx) || isNotDefined(hy) || isNotDefined(hz) || isNotDefined(radius))
        throw new Error(`Collider shape is "${collisionShape}" but "hx"(${hx}), "hy"(${hy}), "hz"(${hz}), or "radius"(${radius}) are not defined`);
      return ColliderDesc[collisionShape](hx, hy, hz, borderRadius);
    case CollisionShape.RoundTriangle:
      if (isNotDefined(a) || isNotDefined(b) || isNotDefined(c) || isNotDefined(radius))
        throw new Error(`Collider shape is "${collisionShape}" but "a"(${a}), "b"(${b}), "c"(${c}), or "radius"(${radius}) are not defined`);
      return ColliderDesc[collisionShape](a, b, c, borderRadius);
    case CollisionShape.RoundCylinder:
      if (isNotDefined(halfHeight) || isNotDefined(radius) || isNotDefined(borderRadius))
        throw new Error(`Collider shape is "${collisionShape}" but "halfHeight"(${halfHeight}), "radius"(${radius}), or "borderRadius"(${borderRadius}) are not defined`);
      return ColliderDesc[collisionShape](halfHeight, radius, borderRadius);
    case CollisionShape.RoundCone:
      if (isNotDefined(halfHeight) || isNotDefined(radius) || isNotDefined(borderRadius))
        throw new Error(`Collider shape is "${collisionShape}" but "halfHeight"(${halfHeight}), "radius"(${radius}), or "borderRadius"(${borderRadius}) are not defined`);
      return ColliderDesc[collisionShape](halfHeight, radius, borderRadius);
    case CollisionShape.RoundConvexPolyhedron:
      throw new Error(`Collider shape is "${collisionShape}" but it is not supported yet`);
    // if (isNotDefined(vertices) || isNotDefined(indices) || isNotDefined(borderRadius)) throw new Error(`Collider shape is "${collisionShape}" but "vertices"(${vertices}), "indices"(${indices}), or "borderRadius"(${borderRadius}) are not defined`);
    // return ColliderDesc[collisionShape](vertices, indices, borderRadius );
    case CollisionShape.HalfSpace:
      throw new Error(`Collider shape is "${collisionShape}" but it is not supported yet`);
    // if (isNotDefined(normal)) throw new Error(`Collider shape is "${collisionShape}" but "normal" is not defined`);
    // return ColliderDesc[collisionShape](normal);
    default:
      throw new Error(`Unknown collider type: ${type}`);
  }
}

export function paramsToMeters(params: TPhysicsBodyParams): TWithUndefined<TAllPhysicsBodyParams> {
  const vertices: Float32Array | undefined = (params as TPhysicsBodyPolylineParams).vertices;
  const indices: Uint32Array | undefined = (params as TPhysicsBodyPolylineParams).indices;
  const flags: TriMeshFlags | undefined = (params as TPhysicsBodyTriMeshParams).flags;
  const heights: Float32Array | undefined = (params as TPhysicsBodyHeightfieldParams).heights;
  const nrows: number | undefined = (params as TPhysicsBodyHeightfieldParams).nrows;
  const ncols: number | undefined = (params as TPhysicsBodyHeightfieldParams).ncols;

  const a: TWithCoordsXYZ | undefined = isDefined((params as TPhysicsBodyTriangleParams).a) ? coordsXYZToMeters((params as TPhysicsBodyTriangleParams).a) : undefined;
  const b: TWithCoordsXYZ | undefined = isDefined((params as TPhysicsBodyTriangleParams).b) ? coordsXYZToMeters((params as TPhysicsBodyTriangleParams).b) : undefined;
  const c: TWithCoordsXYZ | undefined = isDefined((params as TPhysicsBodyTriangleParams).c) ? coordsXYZToMeters((params as TPhysicsBodyTriangleParams).c) : undefined;
  const borderRadius: number | undefined = (params as TPhysicsBodyRoundTriangleParams).borderRadius ? meters((params as TPhysicsBodyRoundTriangleParams).borderRadius) : undefined;
  const halfHeight: number | undefined = (params as TPhysicsBodyCapsuleParams).halfHeight ? meters((params as TPhysicsBodyCapsuleParams).halfHeight) : undefined;
  const radius: number | undefined = (params as TPhysicsBodyBallParams).radius ? meters((params as TPhysicsBodyBallParams).radius) : undefined;
  const hx: number | undefined = (params as TPhysicsBodyCuboidParams).hx ? meters((params as TPhysicsBodyCuboidParams).hx) : undefined;
  const hy: number | undefined = (params as TPhysicsBodyCuboidParams).hy ? meters((params as TPhysicsBodyCuboidParams).hy) : undefined;
  const hz: number | undefined = (params as TPhysicsBodyCuboidParams).hz ? meters((params as TPhysicsBodyCuboidParams).hz) : undefined;
  const scale: TWithCoordsXYZ | undefined = (params as TPhysicsBodyHeightfieldParams).scale ? coordsXYZToMeters((params as TPhysicsBodyHeightfieldParams).scale) : undefined;
  const normal: TWithCoordsXYZ | undefined = (params as TPhysicsBodyHalfSpaceParams).normal ? coordsXYZToMeters((params as TPhysicsBodyHalfSpaceParams).normal) : undefined;

  return { a, b, c, borderRadius, nrows, ncols, normal, heights, scale, halfHeight, flags, radius, hx, hy, hz, vertices, indices };
}
