import type { TIntersectionsWatcher, TIntersectionsWatcherConfig } from '@/Engine/Intersections/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function intersectionsToConfig(entity: TIntersectionsWatcher): TIntersectionsWatcherConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);

  // TODO 15-0-0: fix any
  return filterOutEmptyFields({
    ...extractSerializableRegistrableFields(entity)
  }) as any;
}
