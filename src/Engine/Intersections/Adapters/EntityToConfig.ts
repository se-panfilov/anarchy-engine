import type { TActor } from '@/Engine/Actor';
import type { TIntersectionsWatcher, TIntersectionsWatcherConfig } from '@/Engine/Intersections/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function intersectionsToConfig(entity: TIntersectionsWatcher): TIntersectionsWatcherConfig {
  return filterOutEmptyFields({
    cameraName: entity.getCamera().name,
    actorNames: entity.getActors().map((actor: TActor): string => actor.name),
    isAutoStart: entity.isAutoStart,
    intersectionsLoop: entity.getIntersectionsLoop()?.name,
    ...extractSerializableRegistrableFields(entity)
  });
}
