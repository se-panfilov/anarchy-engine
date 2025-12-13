import type { HeightFieldFlags, TriMeshFlags } from '@dimforge/rapier3d/geometry/shape';
import type { Vector } from '@dimforge/rapier3d/math';

export type TObjectBallPhysicsParams = Readonly<{
  radius?: number;
}>;

export type TObjectHalfSpacePhysicsParams = Readonly<{
  normal: Vector;
}>;

export type TObjectCuboidPhysicsParams = Readonly<{
  hx: number;
  hy: number;
  hz: number;
}>;

export type TObjectRoundCuboidPhysicsParams = Readonly<{
  hx: number;
  hy: number;
  hz: number;
  borderRadius: number;
}>;

export type TObjectCapsulePhysicsParams = Readonly<{
  halfHeight: number;
  radius: number;
}>;

export type TObjectRoundCapsulePhysicsParams = Readonly<{
  halfHeight: number;
  radius: number;
  borderRadius: number;
}>;

export type TObjectSegmentPhysicsParams = Readonly<{
  a: Vector;
  b: Vector;
}>;

export type TObjectTrianglePhysicsParams = Readonly<{
  a: Vector;
  b: Vector;
  c: Vector;
}>;

export type TObjectRoundTrianglePhysicsParams = Readonly<{
  a: Vector;
  b: Vector;
  c: Vector;
  borderRadius: number;
}>;

export type TObjectPolylinePhysicsParams = Readonly<{
  vertices: Float32Array;
  indices?: Uint32Array;
}>;

export type TObjectTriMeshPhysicsParams = Readonly<{
  vertices: Float32Array;
  indices: Uint32Array;
  flags?: TriMeshFlags;
}>;

export type TObjectConvexPolyhedronPhysicsParams = Readonly<{
  vertices: Float32Array;
  indices?: Uint32Array | null;
}>;

export type TObjectRoundConvexPolyhedronPhysicsParams = Readonly<{
  vertices: Float32Array;
  indices: Uint32Array | null | undefined;
  borderRadius: number;
}>;

export type TObjectHeightfieldPhysicsParams = Readonly<{
  nrows: number;
  ncols: number;
  heights: Float32Array;
  scale: Vector;
  flags?: HeightFieldFlags;
}>;

export type TObjectCylinderPhysicsParams = Readonly<{
  halfHeight: number;
  radius: number;
}>;

export type TObjectRoundCylinderPhysicsParams = Readonly<{
  halfHeight: number;
  radius: number;
  borderRadius: number;
}>;

export type TObjectConePhysicsParams = Readonly<{
  halfHeight: number;
  radius: number;
}>;

export type TObjectRoundConePhysicsParams = Readonly<{
  halfHeight: number;
  radius: number;
  borderRadius: number;
}>;

export type TObjectPhysicsParams =
  | TObjectBallPhysicsParams
  | TObjectHalfSpacePhysicsParams
  | TObjectCuboidPhysicsParams
  | TObjectRoundCuboidPhysicsParams
  | TObjectCapsulePhysicsParams
  | TObjectRoundCapsulePhysicsParams
  | TObjectSegmentPhysicsParams
  | TObjectTrianglePhysicsParams
  | TObjectRoundTrianglePhysicsParams
  | TObjectPolylinePhysicsParams
  | TObjectTriMeshPhysicsParams
  | TObjectConvexPolyhedronPhysicsParams
  | TObjectRoundConvexPolyhedronPhysicsParams
  | TObjectHeightfieldPhysicsParams
  | TObjectCylinderPhysicsParams
  | TObjectRoundCylinderPhysicsParams
  | TObjectConePhysicsParams
  | TObjectRoundConePhysicsParams;
