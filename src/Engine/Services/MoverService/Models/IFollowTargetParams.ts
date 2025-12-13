import type { IMovableXYZ, IWithCoordsXYZ, IWithPositionXYZ } from '@/Engine/Mixins';

export type IFollowTargetParams = Readonly<{
  obj: IMovableXYZ;
  target: IWithPositionXYZ;
  offset?: Partial<IWithCoordsXYZ>;
}>;
