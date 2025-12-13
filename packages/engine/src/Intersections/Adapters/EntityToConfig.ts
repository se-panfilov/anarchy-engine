import type { TActor } from '@Engine/Actor';
import type {
  TAbstractIntersectionsWatcherConfig,
  TAnyIntersectionsWatcher,
  TAnyIntersectionsWatcherConfig,
  TIntersectionsCameraWatcher,
  TIntersectionsCameraWatcherConfig,
  TIntersectionsDirectionWatcher,
  TIntersectionsDirectionWatcherConfig,
  TIntersectionsWatcher
} from '@Engine/Intersections/Models';
import type { TIntersectionsWatcherConfig } from '@Engine/Intersections/Models/TIntersectionsWatcherConfig';
import { isIntersectionsCameraWatcher, isIntersectionsDirectionWatcher } from '@Engine/Intersections/Utils';
import { extractSerializableRegistrableFields } from '@Engine/Mixins';
import { vector3ToXyz } from '@Engine/Utils';
import { filterOutEmptyFields } from '@Shared/Utils';

export function intersectionsToConfig(entity: TAnyIntersectionsWatcher): TAnyIntersectionsWatcherConfig {
  const config: TIntersectionsWatcherConfig = intersectionsAbstractToConfig(entity);
  let result: TAnyIntersectionsWatcherConfig;

  if (isIntersectionsDirectionWatcher(entity)) {
    result = { ...config, ...intersectionsDirectionToConfig(entity) };
  } else if (isIntersectionsCameraWatcher(entity)) {
    result = { ...config, ...intersectionsCameraToConfig(entity) };
  } else {
    throw new Error(`[Intersections]: Entity to config failed: Unknown intersections watcher type: ${(entity as TAnyIntersectionsWatcherConfig).name}`);
  }

  return result;
}

export function intersectionsAbstractToConfig(entity: TIntersectionsWatcher): TIntersectionsWatcherConfig {
  return filterOutEmptyFields({
    actorNames: Array.from(entity.getActors().values(), (actor: TActor): string => actor.name),
    isAutoStart: entity.isAutoStart,
    intersectionsLoop: entity.getIntersectionsLoop()?.name,
    far: entity.raycaster?.far,
    performance: entity.getPerformanceSettings(),
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
    origin: vector3ToXyz(entity.origin$.value),
    direction: vector3ToXyz(entity.direction$.value)
  });
}
