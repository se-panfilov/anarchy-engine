import type { IWithPosition3d, TWithCoordsXYZ } from '@/Engine/Mixins';
import type { IMovableEntityWrapper, IStopMoveCb } from '@/Engine/Services/MoverService/Models';
import type { TAnimationParams } from '@/Engine/Services/MoverService/Models/TAnimationParams';

import type { IKeyframeDestination } from './IKeyframeDestination';
import type { IMoveDestination } from './IMoveDestination';

export type TMoverService = Readonly<{
  goToPosition: (obj: IMovableEntityWrapper, destination: IMoveDestination, params: TAnimationParams) => Promise<void>;
  goByPath: (obj: IMovableEntityWrapper, path: ReadonlyArray<IKeyframeDestination>, params: TAnimationParams) => Promise<void>;
  followTarget: (obj: IMovableEntityWrapper, target: IWithPosition3d, offset?: Partial<TWithCoordsXYZ>) => IStopMoveCb;
}>;
