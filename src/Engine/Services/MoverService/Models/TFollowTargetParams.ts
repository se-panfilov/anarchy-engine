import type { TMovable3dXYZ, TWithCoordsXYZ, TWithPosition3d } from '@/Engine/Mixins';

export type TFollowTargetParams = Readonly<{
  obj: TMovable3dXYZ;
  target: TWithPosition3d;
  offset?: Partial<TWithCoordsXYZ>;
}>;
