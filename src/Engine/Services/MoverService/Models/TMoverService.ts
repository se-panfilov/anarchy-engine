import type { TWithCoordsXYZ, TWithPosition3d } from '@/Engine/Mixins';
import type { TMovableEntityWrapper, TStopMoveCb } from '@/Engine/Services/MoverService/Models';
import type { TAnimationParams } from '@/Engine/Services/MoverService/Models/TAnimationParams';

import type { TKeyframeDestination } from './TKeyframeDestination';
import type { TMoveDestination } from './TMoveDestination';

export type TMoverService = Readonly<{
  goToPosition: (obj: TMovableEntityWrapper, destination: TMoveDestination, params: TAnimationParams) => Promise<void>;
  goByPath: (obj: TMovableEntityWrapper, path: ReadonlyArray<TKeyframeDestination>, params: TAnimationParams) => Promise<void>;
  followTarget: (obj: TMovableEntityWrapper, target: TWithPosition3d, offset?: Partial<TWithCoordsXYZ>) => TStopMoveCb;
}>;
