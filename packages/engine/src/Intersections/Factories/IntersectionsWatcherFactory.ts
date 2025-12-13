import type { TReactiveFactory } from '@/Abstract';
import { FactoryType, ReactiveFactory } from '@/Abstract';
import { configToParams } from '@/Intersections/Adapters';
import type { TAnyIntersectionsWatcher, TAnyIntersectionsWatcherParams, TIntersectionsWatcherFactory } from '@/Intersections/Models';
import { isIntersectionsCameraWatcherParams, isIntersectionsDirectionWatcherParams } from '@/Intersections/Utils';
import { IntersectionsCameraWatcher, IntersectionsDirectionWatcher } from '@/Intersections/Watchers';

function create(params: TAnyIntersectionsWatcherParams): TAnyIntersectionsWatcher | never {
  if (isIntersectionsCameraWatcherParams(params)) return IntersectionsCameraWatcher(params);
  else if (isIntersectionsDirectionWatcherParams(params)) return IntersectionsDirectionWatcher(params);
  else throw new Error(`[IntersectionsWatcherFactory]: Unknown params type. Name: "${(params as TAnyIntersectionsWatcherParams).name}"`);
}

export function IntersectionsWatcherFactory(): TIntersectionsWatcherFactory {
  const factory: TReactiveFactory<TAnyIntersectionsWatcher, TAnyIntersectionsWatcherParams> = ReactiveFactory(FactoryType.IntersectionsWatcher, create);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
