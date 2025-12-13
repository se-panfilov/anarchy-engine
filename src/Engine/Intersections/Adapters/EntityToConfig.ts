import type { TActor } from '@/Engine/Actor';
import type {
  TAbstractIntersectionsWatcher,
  TAbstractIntersectionsWatcherConfig,
  TAnyIntersectionsWatcher,
  TAnyIntersectionsWatcherConfig,
  TIntersectionsCameraWatcher,
  TIntersectionsCameraWatcherConfig,
  TIntersectionsDirectionWatcher,
  TIntersectionsDirectionWatcherConfig
} from '@/Engine/Intersections/Models';
import { isIntersectionsCameraWatcher, isIntersectionsDirectionWatcher } from '@/Engine/Intersections/Utils';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields, vector3ToXyz } from '@/Engine/Utils';

export function intersectionsToConfig(entity: TAnyIntersectionsWatcher): TAnyIntersectionsWatcherConfig {
  const abstractConfig: TAbstractIntersectionsWatcherConfig = intersectionsAbstractToConfig(entity);
  let result: TAnyIntersectionsWatcherConfig;

  if (isIntersectionsDirectionWatcher(entity)) {
    result = { ...abstractConfig, ...intersectionsDirectionToConfig(entity) };
  } else if (isIntersectionsCameraWatcher(entity)) {
    result = { ...abstractConfig, ...intersectionsCameraToConfig(entity) };
  } else {
    throw new Error(`[Intersections]: Entity to config failed: Unknown intersections watcher type: ${(entity as TAnyIntersectionsWatcherConfig).name}`);
  }

  return result;
}

export function intersectionsAbstractToConfig(entity: TAbstractIntersectionsWatcher): TAbstractIntersectionsWatcherConfig {
  return filterOutEmptyFields({
    actorNames: entity.getActors().map((actor: TActor): string => actor.name),
    isAutoStart: entity.isAutoStart,
    intersectionsLoop: entity.getIntersectionsLoop()?.name,
    ...extractSerializableRegistrableFields(entity)
  });
}

export function intersectionsCameraToConfig(entity: TIntersectionsCameraWatcher): Omit<TIntersectionsCameraWatcherConfig, keyof TAbstractIntersectionsWatcherConfig> {
  return filterOutEmptyFields({
    cameraName: entity.getCamera().name
  });
}

export function intersectionsDirectionToConfig(entity: TIntersectionsDirectionWatcher): Omit<TIntersectionsDirectionWatcherConfig, keyof TAbstractIntersectionsWatcherConfig> {
  return filterOutEmptyFields({
    origin: vector3ToXyz(entity.getOrigin()),
    direction: vector3ToXyz(entity.getDirection())
  });
}
