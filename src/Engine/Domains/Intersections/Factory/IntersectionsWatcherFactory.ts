import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Domains/Abstract';

import { IntersectionsWatcher } from '@/Engine/Domains/Intersections/Watchers';

import type { IIntersectionsWatcher, IIntersectionsWatcherFactory, IIntersectionsWatcherParams } from '../Models';

const factory: IReactiveFactory<IIntersectionsWatcher, IIntersectionsWatcherParams> = { ...ReactiveFactory(FactoryType.IntersectionsWatcher, IntersectionsWatcher) };
export const IntersectionsWatcherFactory = (): IIntersectionsWatcherFactory => ({ ...factory });
