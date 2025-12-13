import type { Vector3 } from 'three';

import type { TNoSpread } from '@/Engine/Mixins';
import type { TStopMoveCb } from '@/Engine/Services/MoverService/Models';
import type { TAnimationParams } from '@/Engine/Services/MoverService/Models/TAnimationParams';
import type { TWithConnectedTransformAgent, TWithTransformDrive } from '@/Engine/TransformDrive';

import type { TKeyframeDestination } from './TKeyframeDestination';
import type { TMoveDestination } from './TMoveDestination';

export type TMoverService = Readonly<{
  goToPosition: (obj: TWithTransformDrive<TWithConnectedTransformAgent>, destination: TMoveDestination, params: TAnimationParams) => Promise<void>;
  goByPath: (obj: TWithTransformDrive<TWithConnectedTransformAgent>, path: ReadonlyArray<TKeyframeDestination>, params: TAnimationParams) => Promise<void>;
  followTarget: (obj: TWithTransformDrive<TWithConnectedTransformAgent>, target: TWithTransformDrive<any>, offset?: Partial<Vector3>) => TStopMoveCb;
}> &
  TNoSpread;
