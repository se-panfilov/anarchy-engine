import type { IReactiveFactory } from '@Engine/Domains/Abstract';

import type { IDestroyable } from '@/Engine/Domains/Mixins';

import type { IIntersectionsWatcher } from './IIntersectionsWatcher';
import type { IIntersectionsWatcherParams } from './IIntersectionsWatcherParams';

export type IIntersectionsWatcherFactory = IReactiveFactory<IIntersectionsWatcher, IIntersectionsWatcherParams> & IDestroyable;
