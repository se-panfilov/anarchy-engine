import type { TMovable3dXYZ, IWithPosition3d, TWithCoordsXYZ } from '@/Engine/Mixins';

export type IFollowTargetParams = Readonly<{
  obj: TMovable3dXYZ;
  target: IWithPosition3d;
  offset?: Partial<TWithCoordsXYZ>;
}>;
