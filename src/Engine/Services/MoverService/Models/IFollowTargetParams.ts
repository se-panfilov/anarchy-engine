import type { TWithPosition3d, TMovable3dXYZ, TWithCoordsXYZ } from '@/Engine/Mixins';

export type IFollowTargetParams = Readonly<{
  obj: TMovable3dXYZ;
  target: TWithPosition3d;
  offset?: Partial<TWithCoordsXYZ>;
}>;
