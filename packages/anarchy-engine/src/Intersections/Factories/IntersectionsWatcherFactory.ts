import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { configToParams } from '@Anarchy/Engine/Intersections/Adapters';
import type { TAnyIntersectionsWatcher, TAnyIntersectionsWatcherParams, TIntersectionsWatcherFactory } from '@Anarchy/Engine/Intersections/Models';
import { isIntersectionsCameraWatcherParams, isIntersectionsDirectionWatcherParams } from '@Anarchy/Engine/Intersections/Utils';
import { IntersectionsCameraWatcher, IntersectionsDirectionWatcher } from '@Anarchy/Engine/Intersections/Watchers';

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
