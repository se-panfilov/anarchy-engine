import type { IWithPosition3d, TMovable3dXYZ, TWithCoordsXYZ } from '@/Engine/Mixins';

export type IFollowTargetParams = Readonly<{
  obj: TMovable3dXYZ;
  target: IWithPosition3d;
  offset?: Partial<TWithCoordsXYZ>;
}>;
