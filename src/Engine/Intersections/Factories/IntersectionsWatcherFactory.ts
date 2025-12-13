import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParamsAsync } from '@/Engine/Intersections/Adapters';
import type { IIntersectionsWatcher, IIntersectionsWatcherFactory, IIntersectionsWatcherParams } from '@/Engine/Intersections/Models';
import { IntersectionsWatcher } from '@/Engine/Intersections/Watchers';

const factory: IReactiveFactory<IIntersectionsWatcher, IIntersectionsWatcherParams> = { ...ReactiveFactory(FactoryType.IntersectionsWatcher, IntersectionsWatcher) };
export const IntersectionsWatcherFactory = (): IIntersectionsWatcherFactory => ({ ...factory, configToParamsAsync });
