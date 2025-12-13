import type { IMovable3dXYZ, IWithCoordsXYZ, IWithPosition3d } from '@/Engine/Mixins';

export type IFollowTargetParams = Readonly<{
  obj: IMovable3dXYZ;
  target: IWithPosition3d;
  offset?: Partial<IWithCoordsXYZ>;
}>;
