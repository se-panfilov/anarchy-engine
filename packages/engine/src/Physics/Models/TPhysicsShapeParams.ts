import type { HeightFieldFlags, TriMeshFlags } from '@dimforge/rapier3d/geometry/shape';
import type { Vector } from '@dimforge/rapier3d/math';

export type TPhysicsShapeBallParams = Readonly<{
  radius?: number;
}>;

export type TPhysicsShapeHalfSpaceParams = Readonly<{
  normal: Vector;
}>;

export type TPhysicsShapeCuboidParams = Readonly<{
  hx: number;
  hy: number;
  hz: number;
}>;

export type TPhysicsShapeRoundCuboidParams = Readonly<{
  hx: number;
  hy: number;
  hz: number;
  borderRadius: number;
}>;

export type TPhysicsShapeCapsuleParams = Readonly<{
  halfHeight: number;
  radius: number;
}>;

export type TPhysicsShapeRoundCapsuleParams = Readonly<{
  halfHeight: number;
  radius: number;
  borderRadius: number;
}>;

export type TPhysicsShapeSegmentParams = Readonly<{
  a: Vector;
  b: Vector;
}>;

export type TPhysicsShapeTriangleParams = Readonly<{
  a: Vector;
  b: Vector;
  c: Vector;
}>;

export type TPhysicsShapeRoundTriangleParams = Readonly<{
  a: Vector;
  b: Vector;
  c: Vector;
  borderRadius: number;
}>;

export type TPhysicsShapePolylineParams = Readonly<{
  vertices: Float32Array;
  indices?: Uint32Array;
}>;

export type TPhysicsShapeTriMeshParams = Readonly<{
  vertices: Float32Array;
  indices: Uint32Array;
  flags?: TriMeshFlags;
}>;

export type TPhysicsShapeConvexPolyhedronParams = Readonly<{
  vertices: Float32Array;
  indices?: Uint32Array | null;
}>;

export type TPhysicsShapeRoundConvexPolyhedronParams = Readonly<{
  vertices: Float32Array;
  indices: Uint32Array | null | undefined;
  borderRadius: number;
}>;

export type TPhysicsShapeHeightfieldParams = Readonly<{
  nrows: number;
  ncols: number;
  heights: Float32Array;
  scale: Vector;
  flags?: HeightFieldFlags;
}>;

export type TPhysicsShapeCylinderParams = Readonly<{
  halfHeight: number;
  radius: number;
}>;

export type TPhysicsShapeRoundCylinderParams = Readonly<{
  halfHeight: number;
  radius: number;
  borderRadius: number;
}>;

export type TPhysicsShapeConeParams = Readonly<{
  halfHeight: number;
  radius: number;
}>;

export type TPhysicsShapeRoundConeParams = Readonly<{
  halfHeight: number;
  radius: number;
  borderRadius: number;
}>;

export type TPhysicsShapeParams =
  | TPhysicsShapeBallParams
  | TPhysicsShapeHalfSpaceParams
  | TPhysicsShapeCuboidParams
  | TPhysicsShapeRoundCuboidParams
  | TPhysicsShapeCapsuleParams
  | TPhysicsShapeRoundCapsuleParams
  | TPhysicsShapeSegmentParams
  | TPhysicsShapeTriangleParams
  | TPhysicsShapeRoundTriangleParams
  | TPhysicsShapePolylineParams
  | TPhysicsShapeTriMeshParams
  | TPhysicsShapeConvexPolyhedronParams
  | TPhysicsShapeRoundConvexPolyhedronParams
  | TPhysicsShapeHeightfieldParams
  | TPhysicsShapeCylinderParams
  | TPhysicsShapeRoundCylinderParams
  | TPhysicsShapeConeParams
  | TPhysicsShapeRoundConeParams;

export type TAllPhysicsShapeParams = TPhysicsShapeBallParams &
  TPhysicsShapeHalfSpaceParams &
  TPhysicsShapeCuboidParams &
  TPhysicsShapeRoundCuboidParams &
  TPhysicsShapeCapsuleParams &
  TPhysicsShapeRoundCapsuleParams &
  TPhysicsShapeSegmentParams &
  TPhysicsShapeTriangleParams &
  TPhysicsShapeRoundTriangleParams &
  TPhysicsShapePolylineParams &
  TPhysicsShapeTriMeshParams &
  TPhysicsShapeConvexPolyhedronParams &
  TPhysicsShapeRoundConvexPolyhedronParams &
  TPhysicsShapeHeightfieldParams &
  TPhysicsShapeCylinderParams &
  TPhysicsShapeRoundCylinderParams &
  TPhysicsShapeConeParams &
  TPhysicsShapeRoundConeParams;
