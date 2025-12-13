import type animate from 'animejs';

import type { TFollowTargetParams } from './TFollowTargetParams';
import type { TMoveByPathFnParams } from './TMoveByPathFnParams';
import type { TMoveFnParams } from './TMoveFnParams';

export type TMoveableByTick = Readonly<{
  tick: (time: number) => void;
}>;
export type TMoveFn = (params: TMoveFnParams) => TMoveableByTick & animate.AnimeInstance;
export type TMoveByPathFn = (params: TMoveByPathFnParams) => TMoveableByTick & animate.AnimeInstance;
export type TFollowTargetFn = (params: TFollowTargetParams) => TMoveableByTick;
