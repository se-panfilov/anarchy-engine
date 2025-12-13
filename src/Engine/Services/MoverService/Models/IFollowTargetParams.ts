import type { IMovable3dXYZ, IWithPosition3d, TWithCoordsXYZ } from '@/Engine/Mixins';

export type IFollowTargetParams = Readonly<{
  obj: IMovable3dXYZ;
  target: IWithPosition3d;
  offset?: Partial<TWithCoordsXYZ>;
}>;
