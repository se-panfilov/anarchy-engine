import type anime from 'animejs';

import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { IWithCoords3 } from '@/Engine/Mixins';
import type { IAnimationParams } from '@/Engine/Services';

export type IMoveFn = (actor: IActorWrapper, targetPosition: IWithCoords3, params: IAnimationParams, complete: (...rest: ReadonlyArray<unknown>) => any) => anime.AnimeInstance;
