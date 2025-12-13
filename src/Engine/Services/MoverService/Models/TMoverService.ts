import type { Vector3 } from 'three';

import type { TWithCoordsXYZ } from '@/Engine/Mixins';
import type { TStopMoveCb } from '@/Engine/Services/MoverService/Models';
import type { TAnimationParams } from '@/Engine/Services/MoverService/Models/TAnimationParams';

import type { TKeyframeDestination } from './TKeyframeDestination';
import type { TMoveDestination } from './TMoveDestination';

export type TMoverService = Readonly<{
  goToPosition: (obj: TWithCoordsXYZ, destination: TMoveDestination, params: TAnimationParams) => Promise<void>;
  goByPath: (obj: TWithCoordsXYZ, path: ReadonlyArray<TKeyframeDestination>, params: TAnimationParams) => Promise<void>;
  followTarget: (obj: TWithCoordsXYZ, target: TWithCoordsXYZ, offset?: Partial<Vector3>) => TStopMoveCb;
}>;
