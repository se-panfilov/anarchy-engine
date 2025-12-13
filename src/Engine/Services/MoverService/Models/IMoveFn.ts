import type anime from 'animejs';

import type { IMoveByPathFnParams } from './IMoveByPathFnParams';
import type { IMoveFnParams } from './IMoveFnParams';

export type IMoveFn = (params: IMoveFnParams) => anime.AnimeInstance;
export type IMoveByPathFn = (params: IMoveByPathFnParams) => anime.AnimeInstance;
