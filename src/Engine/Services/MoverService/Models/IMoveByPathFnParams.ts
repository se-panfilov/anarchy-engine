import type { IFullKeyframeDestination } from './IFullKeyframeDestination';
import type { IMoveFnParams } from './IMoveFnParams';

export type IMoveByPathFnParams = Omit<IMoveFnParams, 'destination'> &
  Readonly<{
    path: ReadonlyArray<IFullKeyframeDestination>;
  }>;
