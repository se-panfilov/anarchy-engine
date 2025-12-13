import type {
  TIntersectionsCameraWatcher,
  TIntersectionsCameraWatcherConfig,
  TIntersectionsCameraWatcherParams,
  TIntersectionsDirectionWatcher,
  TIntersectionsDirectionWatcherConfig,
  TIntersectionsDirectionWatcherParams
} from '@/Engine/Intersections/Models';
import { isDefined } from '@/Engine/Utils';

export function isIntersectionsDirectionWatcherConfig(config: TIntersectionsCameraWatcherConfig | TIntersectionsDirectionWatcherConfig): config is TIntersectionsDirectionWatcherConfig {
  return isDefined((config as TIntersectionsDirectionWatcherConfig).origin) && isDefined((config as TIntersectionsDirectionWatcherConfig).direction);
}

export function isIntersectionsCameraWatcherConfig(config: TIntersectionsCameraWatcherConfig | TIntersectionsDirectionWatcherConfig): config is TIntersectionsCameraWatcherConfig {
  return isDefined((config as TIntersectionsCameraWatcherConfig).cameraName);
}

export function isIntersectionsDirectionWatcherParams(params: TIntersectionsCameraWatcherParams | TIntersectionsDirectionWatcherParams): params is TIntersectionsDirectionWatcherParams {
  return isDefined((params as TIntersectionsDirectionWatcherParams).origin) && isDefined((params as TIntersectionsDirectionWatcherParams).direction);
}

export function isIntersectionsCameraWatcherParams(params: TIntersectionsCameraWatcherParams | TIntersectionsDirectionWatcherParams): params is TIntersectionsCameraWatcherParams {
  return isDefined((params as TIntersectionsCameraWatcherParams).camera);
}

export function isIntersectionsDirectionWatcher(watcher: TIntersectionsCameraWatcher | TIntersectionsDirectionWatcher): watcher is TIntersectionsDirectionWatcher {
  return isDefined((watcher as TIntersectionsDirectionWatcher).getOrigin) && isDefined((watcher as TIntersectionsDirectionWatcher).getDirection);
}

export function isIntersectionsCameraWatcher(watcher: TIntersectionsCameraWatcher | TIntersectionsDirectionWatcher): watcher is TIntersectionsCameraWatcher {
  return isDefined((watcher as TIntersectionsCameraWatcher).getCamera);
}
