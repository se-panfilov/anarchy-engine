import type { Collider, RigidBody, TriMeshFlags, World } from '@dimforge/rapier3d';
import { ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d';
import type { Vector3 } from 'three';

import { coordsXYZToMeters, meters } from '@/Measurements/Utils';
import { CollisionShape, RigidBodyTypesNames } from '@/Physics/Constants';
import type {
  TAllPhysicsShapeParams,
  TPhysicsBodyEntities,
  TPhysicsBodyParams,
  TPhysicsShapeBallParams,
  TPhysicsShapeCapsuleParams,
  TPhysicsShapeConeParams,
  TPhysicsShapeCuboidParams,
  TPhysicsShapeHalfSpaceParams,
  TPhysicsShapeHeightfieldParams,
  TPhysicsShapeParams,
  TPhysicsShapePolylineParams,
  TPhysicsShapeRoundTriangleParams,
  TPhysicsShapeTriangleParams,
  TPhysicsShapeTriMeshParams
} from '@/Physics/Models';
import type { TOptional } from '@/Utils';
import { isDefined, isNotDefined } from '@/Utils';

export function createPhysicsBodyEntities(params: TPhysicsBodyParams, world: World): TPhysicsBodyEntities {
  //Fixed objects (e.g. "ground" or "walls") usually don't need a rigid body (they might, but might bugs might appear)
  if (params.type === RigidBodyTypesNames.Fixed) {
    const colliderDesc: ColliderDesc = getColliderDesc(params);
    if (isDefined(params.position)) colliderDesc.setTranslation(params.position.x, params.position.y, params.position.z);
    if (isDefined(params.rotation)) colliderDesc.setRotation(params.rotation);
    setupColliderDesc(colliderDesc, params);
    const collider: Collider = world.createCollider(colliderDesc);
    return { rigidBody: undefined, rigidBodyDesc: undefined, colliderDesc, collider };
  } else {
    const rigidBodyDesc: RigidBodyDesc = RigidBodyDesc[params.type]();
    if (isDefined(params.position)) rigidBodyDesc.setTranslation(params.position.x, params.position.y, params.position.z);
    if (isDefined(params.rotation)) rigidBodyDesc.setRotation(params.rotation);
    if (isDefined(params.linearVelocity)) rigidBodyDesc.setLinvel(params.linearVelocity.x, params.linearVelocity.y, params.linearVelocity.z);
    if (isDefined(params.angularVelocity)) rigidBodyDesc.setAngvel(params.angularVelocity);
    if (isDefined(params.gravityScale)) rigidBodyDesc.setGravityScale(params.gravityScale);
    if (isDefined(params.dominanceGroup)) rigidBodyDesc.setDominanceGroup(params.dominanceGroup);
    if (isDefined(params.ccdEnabled)) rigidBodyDesc.setCcdEnabled(params.ccdEnabled);

    const rigidBody: RigidBody = world.createRigidBody(rigidBodyDesc);

    const colliderDesc: ColliderDesc = getColliderDesc(params);
    setupColliderDesc(colliderDesc, params);

    const collider: Collider = world.createCollider(colliderDesc, rigidBody);
    return { rigidBody, rigidBodyDesc, colliderDesc, collider };
  }
}

function setupColliderDesc(colliderDesc: ColliderDesc, params: TPhysicsBodyParams): void {
  if (isDefined(params.collisionGroups)) colliderDesc.setCollisionGroups(params.collisionGroups);
  if (isDefined(params.friction)) colliderDesc.setFriction(params.friction);
  if (isDefined(params.restitution)) colliderDesc.setRestitution(params.restitution);
  if (isDefined(params.isSensor)) colliderDesc.setSensor(params.isSensor);
  if (isDefined(params.density)) colliderDesc.setDensity(params.density);
  if (isDefined(params.mass)) colliderDesc.setMass(params.mass);
  if (isDefined(params.solverGroups)) colliderDesc.setSolverGroups(params.solverGroups);
}

// TODO add unit tests
export function getColliderDesc(params: TPhysicsBodyParams): ColliderDesc | never {
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

export function paramsToMeters(params: TPhysicsShapeParams): TOptional<TAllPhysicsShapeParams> {
  const vertices: Float32Array | undefined = (params as TPhysicsShapePolylineParams).vertices;
  const indices: Uint32Array | undefined = (params as TPhysicsShapePolylineParams).indices;
  // "flags" as undefined to suppress a bug with TS
  const flags: TriMeshFlags | undefined = (params as TPhysicsShapeTriMeshParams).flags as undefined;
  const heights: Float32Array | undefined = (params as TPhysicsShapeHeightfieldParams).heights;
  const nrows: number | undefined = (params as TPhysicsShapeHeightfieldParams).nrows;
  const ncols: number | undefined = (params as TPhysicsShapeHeightfieldParams).ncols;

  const a: Vector3 | undefined = isDefined((params as TPhysicsShapeTriangleParams).a) ? coordsXYZToMeters((params as TPhysicsShapeTriangleParams).a) : undefined;
  const b: Vector3 | undefined = isDefined((params as TPhysicsShapeTriangleParams).b) ? coordsXYZToMeters((params as TPhysicsShapeTriangleParams).b) : undefined;
  const c: Vector3 | undefined = isDefined((params as TPhysicsShapeTriangleParams).c) ? coordsXYZToMeters((params as TPhysicsShapeTriangleParams).c) : undefined;
  const borderRadius: number | undefined = (params as TPhysicsShapeRoundTriangleParams).borderRadius ? meters((params as TPhysicsShapeRoundTriangleParams).borderRadius) : undefined;
  const halfHeight: number | undefined = (params as TPhysicsShapeCapsuleParams).halfHeight ? meters((params as TPhysicsShapeCapsuleParams).halfHeight) : undefined;
  const radius: number | undefined = (params as TPhysicsShapeBallParams).radius ? meters((params as TPhysicsShapeConeParams).radius) : undefined;
  const hx: number | undefined = (params as TPhysicsShapeCuboidParams).hx ? meters((params as TPhysicsShapeCuboidParams).hx) : undefined;
  const hy: number | undefined = (params as TPhysicsShapeCuboidParams).hy ? meters((params as TPhysicsShapeCuboidParams).hy) : undefined;
  const hz: number | undefined = (params as TPhysicsShapeCuboidParams).hz ? meters((params as TPhysicsShapeCuboidParams).hz) : undefined;
  const scale: Vector3 | undefined = (params as TPhysicsShapeHeightfieldParams).scale ? coordsXYZToMeters((params as TPhysicsShapeHeightfieldParams).scale) : undefined;
  const normal: Vector3 | undefined = (params as TPhysicsShapeHalfSpaceParams).normal ? coordsXYZToMeters((params as TPhysicsShapeHalfSpaceParams).normal) : undefined;

  return { a, b, c, borderRadius, nrows, ncols, normal, heights, scale, halfHeight, flags, radius, hx, hy, hz, vertices, indices };
}
