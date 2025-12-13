import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParamsAsync } from '@/Engine/Intersections/Adapters';
import type { TIntersectionsWatcherFactory, TIntersectionsWatcherParams, TIntersectionsWatcher } from '@/Engine/Intersections/Models';
import { IntersectionsWatcher } from '@/Engine/Intersections/Watchers';

const factory: TReactiveFactory<TIntersectionsWatcher, TIntersectionsWatcherParams> = { ...ReactiveFactory(FactoryType.IntersectionsWatcher, IntersectionsWatcher) };
export const IntersectionsWatcherFactory = (): TIntersectionsWatcherFactory => ({ ...factory, configToParamsAsync });
