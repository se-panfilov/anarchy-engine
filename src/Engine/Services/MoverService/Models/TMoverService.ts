import type { Vector3 } from 'three';

import type { TMovable3dXYZ, TWithPosition3d } from '@/Engine/Mixins';
import type { TStopMoveCb } from '@/Engine/Services/MoverService/Models';
import type { TAnimationParams } from '@/Engine/Services/MoverService/Models/TAnimationParams';

import type { TKeyframeDestination } from './TKeyframeDestination';
import type { TMoveDestination } from './TMoveDestination';

export type TMoverService = Readonly<{
  goToPosition: (obj: TMovable3dXYZ, destination: TMoveDestination, params: TAnimationParams) => Promise<void>;
  goByPath: (obj: TMovable3dXYZ, path: ReadonlyArray<TKeyframeDestination>, params: TAnimationParams) => Promise<void>;
  followTarget: (obj: TMovable3dXYZ, target: TWithPosition3d, offset?: Partial<Vector3>) => TStopMoveCb;
}>;
