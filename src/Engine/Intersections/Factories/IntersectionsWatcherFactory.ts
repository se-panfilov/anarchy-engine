import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Intersections/Adapters';
import type { TIntersectionsWatcher, TIntersectionsWatcherFactory, TIntersectionsWatcherParams } from '@/Engine/Intersections/Models';
import { IntersectionsWatcher } from '@/Engine/Intersections/Watchers';

const factory: TReactiveFactory<TIntersectionsWatcher, TIntersectionsWatcherParams> = ReactiveFactory(FactoryType.IntersectionsWatcher, IntersectionsWatcher);
// eslint-disable-next-line functional/immutable-data
export const IntersectionsWatcherFactory = (): TIntersectionsWatcherFactory => Object.assign(factory, { configToParams });
