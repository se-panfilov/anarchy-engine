import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParamsAsync } from '@/Engine/Intersections/Adapters';
import type { TIntersectionsWatcher, IIntersectionsWatcherFactory, IIntersectionsWatcherParams } from '@/Engine/Intersections/Models';
import { IntersectionsWatcher } from '@/Engine/Intersections/Watchers';

const factory: TReactiveFactory<TIntersectionsWatcher, IIntersectionsWatcherParams> = { ...ReactiveFactory(FactoryType.IntersectionsWatcher, IntersectionsWatcher) };
export const IntersectionsWatcherFactory = (): IIntersectionsWatcherFactory => ({ ...factory, configToParamsAsync });
