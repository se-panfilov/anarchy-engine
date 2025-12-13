import type { IMovableXYZ, IWithCoordsXYZ, IWithPosition } from '@/Engine/Mixins';

export type IFollowTargetParams = Readonly<{
  obj: IMovableXYZ;
  target: IWithPosition;
  offset?: Partial<IWithCoordsXYZ>;
}>;
