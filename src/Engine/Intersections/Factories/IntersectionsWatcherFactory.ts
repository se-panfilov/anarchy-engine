import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Intersections/Adapters';
import type { TAnyIntersectionsWatcher, TAnyIntersectionsWatcherParams, TIntersectionsWatcherFactory } from '@/Engine/Intersections/Models';
import { IntersectionsCameraWatcher } from '@/Engine/Intersections/Watchers';

export function IntersectionsWatcherFactory(): TIntersectionsWatcherFactory {
  const factory: TReactiveFactory<TAnyIntersectionsWatcher, TAnyIntersectionsWatcherParams> = ReactiveFactory(FactoryType.IntersectionsWatcher, IntersectionsCameraWatcher);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
