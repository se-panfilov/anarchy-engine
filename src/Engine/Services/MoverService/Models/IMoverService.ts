import type { IWithCoordsXYZ, IWithPosition3d } from '@/Engine/Mixins';
import type { IMovableEntityWrapper, IStopMoveCb } from '@/Engine/Services/MoverService/Models';
import type { IAnimationParams } from '@/Engine/Services/MoverService/Models/IAnimationParams';

import type { IKeyframeDestination } from './IKeyframeDestination';
import type { IMoveDestination } from './IMoveDestination';

export type IMoverService = Readonly<{
  goToPosition: (obj: IMovableEntityWrapper, destination: IMoveDestination, params: IAnimationParams) => Promise<void>;
  goByPath: (obj: IMovableEntityWrapper, path: ReadonlyArray<IKeyframeDestination>, params: IAnimationParams) => Promise<void>;
  followTarget: (obj: IMovableEntityWrapper, target: IWithPosition3d, offset?: Partial<IWithCoordsXYZ>) => IStopMoveCb;
}>;
