import type { Collider, RigidBody, World } from '@dimforge/rapier3d';
import { ColliderDesc, RigidBodyDesc, TriMeshFlags } from '@dimforge/rapier3d';

import { coordsXYZToMeters, meters } from '@/Engine/Measurements/Utils';
import type { TWithCoordsXYZ } from '@/Engine/Mixins';
import { CollisionShape } from '@/Engine/Physics/Constants';
import type {
  TAllPhysicsBodyParams,
  TPhysicsBodyBallParams,
  TPhysicsBodyCapsuleParams,
  TPhysicsBodyConeParams,
  TPhysicsBodyCuboidParams,
  TPhysicsBodyFacadeEntities,
  TPhysicsBodyHalfSpaceParams,
  TPhysicsBodyHeightfieldParams,
  TPhysicsBodyParams,
  TPhysicsBodyPolylineParams,
  TPhysicsBodyRoundTriangleParams,
  TPhysicsBodyTriangleParams,
  TPhysicsPresetParams
} from '@/Engine/Physics/Models';
import type { TOptional } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function createPhysicsBody(params: TPhysicsPresetParams, world: World): TPhysicsBodyFacadeEntities {
  const rigidBodyDesc: RigidBodyDesc = RigidBodyDesc[params.type]();
  if (isDefined(params.position)) rigidBodyDesc.setTranslation(params.position.getX(), params.position.getY(), params.position.getZ());
  if (isDefined(params.rotation)) rigidBodyDesc.setRotation(params.rotation.toQuaternion());
  const rigidBody: RigidBody = world.createRigidBody(rigidBodyDesc);
  const colliderDesc: ColliderDesc = getColliderDesc(params);
  const collider: Collider = world.createCollider(colliderDesc, rigidBody);

  return { rigidBody, rigidBodyDesc, colliderDesc, collider };
}

// TODO (S.Panfilov) add unit tests
export function getColliderDesc(params: TPhysicsPresetParams): ColliderDesc | never {
  const { collisionShape, shapeParams } = params;
  const { a, b, c, borderRadius, nrows, ncols, heights, scale, halfHeight, flags, radius, hx, hy, hz, vertices, indices } = paramsToMeters(shapeParams);

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
      if (isNotDefined(hx) || isNotDefined(hy) || isNotDefined(hz) || isNotDefined(borderRadius))
        throw new Error(`Collider shape is "${collisionShape}" but "hx"(${hx}), "hy"(${hy}), "hz"(${hz}), or "radius"(${radius}) are not defined`);
      return ColliderDesc[collisionShape](hx, hy, hz, borderRadius);
    case CollisionShape.RoundTriangle:
      if (isNotDefined(a) || isNotDefined(b) || isNotDefined(c) || isNotDefined(borderRadius))
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
      throw new Error(`Unknown collisionShape: "${collisionShape}"`);
  }
}

export function paramsToMeters(params: TPhysicsBodyParams): TOptional<TAllPhysicsBodyParams> {
  const vertices: Float32Array | undefined = (params as TPhysicsBodyPolylineParams).vertices;
  const indices: Uint32Array | undefined = (params as TPhysicsBodyPolylineParams).indices;
  // const flags: TriMeshFlags | HeightFieldFlags | undefined = (params as TPhysicsBodyTriMeshParams).flags;
  const heights: Float32Array | undefined = (params as TPhysicsBodyHeightfieldParams).heights;
  const nrows: number | undefined = (params as TPhysicsBodyHeightfieldParams).nrows;
  const ncols: number | undefined = (params as TPhysicsBodyHeightfieldParams).ncols;

  const a: TWithCoordsXYZ | undefined = isDefined((params as TPhysicsBodyTriangleParams).a) ? coordsXYZToMeters((params as TPhysicsBodyTriangleParams).a) : undefined;
  const b: TWithCoordsXYZ | undefined = isDefined((params as TPhysicsBodyTriangleParams).b) ? coordsXYZToMeters((params as TPhysicsBodyTriangleParams).b) : undefined;
  const c: TWithCoordsXYZ | undefined = isDefined((params as TPhysicsBodyTriangleParams).c) ? coordsXYZToMeters((params as TPhysicsBodyTriangleParams).c) : undefined;
  const borderRadius: number | undefined = (params as TPhysicsBodyRoundTriangleParams).borderRadius ? meters((params as TPhysicsBodyRoundTriangleParams).borderRadius) : undefined;
  const halfHeight: number | undefined = (params as TPhysicsBodyCapsuleParams).halfHeight ? meters((params as TPhysicsBodyCapsuleParams).halfHeight) : undefined;
  const radius: number | undefined = (params as TPhysicsBodyBallParams).radius ? meters((params as TPhysicsBodyConeParams).radius) : undefined;
  const hx: number | undefined = (params as TPhysicsBodyCuboidParams).hx ? meters((params as TPhysicsBodyCuboidParams).hx) : undefined;
  const hy: number | undefined = (params as TPhysicsBodyCuboidParams).hy ? meters((params as TPhysicsBodyCuboidParams).hy) : undefined;
  const hz: number | undefined = (params as TPhysicsBodyCuboidParams).hz ? meters((params as TPhysicsBodyCuboidParams).hz) : undefined;
  const scale: TWithCoordsXYZ | undefined = (params as TPhysicsBodyHeightfieldParams).scale ? coordsXYZToMeters((params as TPhysicsBodyHeightfieldParams).scale) : undefined;
  const normal: TWithCoordsXYZ | undefined = (params as TPhysicsBodyHalfSpaceParams).normal ? coordsXYZToMeters((params as TPhysicsBodyHalfSpaceParams).normal) : undefined;

  return { a, b, c, borderRadius, nrows, ncols, normal, heights, scale, halfHeight, flags: TriMeshFlags.ORIENTED, radius, hx, hy, hz, vertices, indices };
}
