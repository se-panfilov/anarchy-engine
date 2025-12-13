import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Domains/Abstract';
import type { IIntersectionsWatcher, IIntersectionsWatcherFactory, IIntersectionsWatcherParams } from '@/Engine/Domains/Intersections/Models';
import { IntersectionsWatcher } from '@/Engine/Domains/Intersections/Watchers';

const factory: IReactiveFactory<IIntersectionsWatcher, IIntersectionsWatcherParams> = { ...ReactiveFactory(FactoryType.IntersectionsWatcher, IntersectionsWatcher) };
export const IntersectionsWatcherFactory = (): IIntersectionsWatcherFactory => ({ ...factory });
