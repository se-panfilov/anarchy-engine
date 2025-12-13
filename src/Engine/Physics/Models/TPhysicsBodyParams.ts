import type { HeightFieldFlags, TriMeshFlags } from '@dimforge/rapier3d/geometry/shape';
import type { Vector } from '@dimforge/rapier3d/math';

export type TPhysicsBodyBallParams = Readonly<{
  radius?: number;
}>;

export type TSpacePhysicsBodyHalfParams = Readonly<{
  normal: Vector;
}>;

export type TPhysicsBodyCuboidParams = Readonly<{
  hx: number;
  hy: number;
  hz: number;
}>;

export type TPhysicsBodyRoundCuboidParams = Readonly<{
  hx: number;
  hy: number;
  hz: number;
  borderRadius: number;
}>;

export type TPhysicsBodyCapsuleParams = Readonly<{
  halfHeight: number;
  radius: number;
}>;

export type TPhysicsBodyRoundCapsuleParams = Readonly<{
  halfHeight: number;
  radius: number;
  borderRadius: number;
}>;

export type TPhysicsBodySegmentParams = Readonly<{
  a: Vector;
  b: Vector;
}>;

export type TPhysicsBodyTriangleParams = Readonly<{
  a: Vector;
  b: Vector;
  c: Vector;
}>;

export type TPhysicsBodyRoundTriangleParams = Readonly<{
  a: Vector;
  b: Vector;
  c: Vector;
  borderRadius: number;
}>;

export type TPhysicsBodyPolylineParams = Readonly<{
  vertices: Float32Array;
  indices?: Uint32Array;
}>;

export type TPhysicsBodyTriMeshParams = Readonly<{
  vertices: Float32Array;
  indices: Uint32Array;
  flags?: TriMeshFlags;
}>;

export type TPhysicsBodyConvexPolyhedronParams = Readonly<{
  vertices: Float32Array;
  indices?: Uint32Array | null;
}>;

export type TPolyhedronPhysicsBodyRoundConvexParams = Readonly<{
  vertices: Float32Array;
  indices: Uint32Array | null | undefined;
  borderRadius: number;
}>;

export type TPhysicsBodyHeightfieldParams = Readonly<{
  nrows: number;
  ncols: number;
  heights: Float32Array;
  scale: Vector;
  flags?: HeightFieldFlags;
}>;

export type TPhysicsBodyCylinderParams = Readonly<{
  halfHeight: number;
  radius: number;
}>;

export type TPhysicsBodyRoundCylinderParams = Readonly<{
  halfHeight: number;
  radius: number;
  borderRadius: number;
}>;

export type TPhysicsBodyConeParams = Readonly<{
  halfHeight: number;
  radius: number;
}>;

export type TPhysicsBodyRoundConeParams = Readonly<{
  halfHeight: number;
  radius: number;
  borderRadius: number;
}>;

export type TPhysicsBodyParams =
  | TPhysicsBodyBallParams
  | TSpacePhysicsBodyHalfParams
  | TPhysicsBodyCuboidParams
  | TPhysicsBodyRoundCuboidParams
  | TPhysicsBodyCapsuleParams
  | TPhysicsBodyRoundCapsuleParams
  | TPhysicsBodySegmentParams
  | TPhysicsBodyTriangleParams
  | TPhysicsBodyRoundTriangleParams
  | TPhysicsBodyPolylineParams
  | TPhysicsBodyTriMeshParams
  | TPhysicsBodyConvexPolyhedronParams
  | TPolyhedronPhysicsBodyRoundConvexParams
  | TPhysicsBodyHeightfieldParams
  | TPhysicsBodyCylinderParams
  | TPhysicsBodyRoundCylinderParams
  | TPhysicsBodyConeParams
  | TPhysicsBodyRoundConeParams;
