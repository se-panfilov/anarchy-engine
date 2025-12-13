import type { Vector3 } from 'three';

import type { TWithPosition3d } from '@/Engine/Mixins';
import type { TMovableEntityWrapper, TMovableWithModel3dFacade, TStopMoveCb } from '@/Engine/Services/MoverService/Models';
import type { TAnimationParams } from '@/Engine/Services/MoverService/Models/TAnimationParams';

import type { TKeyframeDestination } from './TKeyframeDestination';
import type { TMoveDestination } from './TMoveDestination';

export type TMoverService = Readonly<{
  goToPosition: (obj: TMovableEntityWrapper | TMovableWithModel3dFacade, destination: TMoveDestination, params: TAnimationParams) => Promise<void>;
  goByPath: (obj: TMovableEntityWrapper | TMovableWithModel3dFacade, path: ReadonlyArray<TKeyframeDestination>, params: TAnimationParams) => Promise<void>;
  followTarget: (obj: TMovableEntityWrapper | TMovableWithModel3dFacade, target: TWithPosition3d, offset?: Partial<Vector3>) => TStopMoveCb;
}>;
