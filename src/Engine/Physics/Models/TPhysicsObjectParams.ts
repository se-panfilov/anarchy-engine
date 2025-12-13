import type { HeightFieldFlags, TriMeshFlags } from '@dimforge/rapier3d/geometry/shape';
import type { Vector } from '@dimforge/rapier3d/math';

export type TPhysicsObjectBallParams = Readonly<{
  radius?: number;
}>;

export type TSpacePhysicsObjectHalfParams = Readonly<{
  normal: Vector;
}>;

export type TPhysicsObjectCuboidParams = Readonly<{
  hx: number;
  hy: number;
  hz: number;
}>;

export type TPhysicsObjectRoundCuboidParams = Readonly<{
  hx: number;
  hy: number;
  hz: number;
  borderRadius: number;
}>;

export type TPhysicsObjectCapsuleParams = Readonly<{
  halfHeight: number;
  radius: number;
}>;

export type TPhysicsObjectRoundCapsuleParams = Readonly<{
  halfHeight: number;
  radius: number;
  borderRadius: number;
}>;

export type TPhysicsObjectSegmentParams = Readonly<{
  a: Vector;
  b: Vector;
}>;

export type TPhysicsObjectTriangleParams = Readonly<{
  a: Vector;
  b: Vector;
  c: Vector;
}>;

export type TPhysicsObjectRoundTriangleParams = Readonly<{
  a: Vector;
  b: Vector;
  c: Vector;
  borderRadius: number;
}>;

export type TPhysicsObjectPolylineParams = Readonly<{
  vertices: Float32Array;
  indices?: Uint32Array;
}>;

export type TPhysicsObjectTriMeshParams = Readonly<{
  vertices: Float32Array;
  indices: Uint32Array;
  flags?: TriMeshFlags;
}>;

export type TPhysicsObjectConvexPolyhedronParams = Readonly<{
  vertices: Float32Array;
  indices?: Uint32Array | null;
}>;

export type TPolyhedronPhysicsObjectRoundConvexParams = Readonly<{
  vertices: Float32Array;
  indices: Uint32Array | null | undefined;
  borderRadius: number;
}>;

export type TPhysicsObjectHeightfieldParams = Readonly<{
  nrows: number;
  ncols: number;
  heights: Float32Array;
  scale: Vector;
  flags?: HeightFieldFlags;
}>;

export type TPhysicsObjectCylinderParams = Readonly<{
  halfHeight: number;
  radius: number;
}>;

export type TPhysicsObjectRoundCylinderParams = Readonly<{
  halfHeight: number;
  radius: number;
  borderRadius: number;
}>;

export type TPhysicsObjectConeParams = Readonly<{
  halfHeight: number;
  radius: number;
}>;

export type TPhysicsObjectRoundConeParams = Readonly<{
  halfHeight: number;
  radius: number;
  borderRadius: number;
}>;

export type TPhysicsObjectParams =
  | TPhysicsObjectBallParams
  | TSpacePhysicsObjectHalfParams
  | TPhysicsObjectCuboidParams
  | TPhysicsObjectRoundCuboidParams
  | TPhysicsObjectCapsuleParams
  | TPhysicsObjectRoundCapsuleParams
  | TPhysicsObjectSegmentParams
  | TPhysicsObjectTriangleParams
  | TPhysicsObjectRoundTriangleParams
  | TPhysicsObjectPolylineParams
  | TPhysicsObjectTriMeshParams
  | TPhysicsObjectConvexPolyhedronParams
  | TPolyhedronPhysicsObjectRoundConvexParams
  | TPhysicsObjectHeightfieldParams
  | TPhysicsObjectCylinderParams
  | TPhysicsObjectRoundCylinderParams
  | TPhysicsObjectConeParams
  | TPhysicsObjectRoundConeParams;
