import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { intersectionsWatcherConfigToParams } from '@hellpig/anarchy-engine/Intersections/Adapters';
import type { TAnyIntersectionsWatcher, TAnyIntersectionsWatcherParams, TIntersectionsWatcherFactory } from '@hellpig/anarchy-engine/Intersections/Models';
import { isIntersectionsCameraWatcherParams, isIntersectionsDirectionWatcherParams } from '@hellpig/anarchy-engine/Intersections/Utils';
import { IntersectionsCameraWatcher, IntersectionsDirectionWatcher } from '@hellpig/anarchy-engine/Intersections/Watchers';

function create(params: TAnyIntersectionsWatcherParams): TAnyIntersectionsWatcher | never {
  if (isIntersectionsCameraWatcherParams(params)) return IntersectionsCameraWatcher(params);
  else if (isIntersectionsDirectionWatcherParams(params)) return IntersectionsDirectionWatcher(params);
  else throw new Error(`[IntersectionsWatcherFactory]: Unknown params type. Name: "${(params as TAnyIntersectionsWatcherParams).name}"`);
}

export function IntersectionsWatcherFactory(): TIntersectionsWatcherFactory {
  const factory: TReactiveFactory<TAnyIntersectionsWatcher, TAnyIntersectionsWatcherParams> = ReactiveFactory(FactoryType.IntersectionsWatcher, create);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: intersectionsWatcherConfigToParams });
}
