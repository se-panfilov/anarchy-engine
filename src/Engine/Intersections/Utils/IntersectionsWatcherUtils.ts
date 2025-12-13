import type { TIntersectionsCameraWatcherConfig, TIntersectionsDirectionWatcherConfig } from '@/Engine/Intersections/Models';
import { isDefined } from '@/Engine/Utils';

export function isIntersectionsDirectionWatcherConfig(params: TIntersectionsCameraWatcherConfig | TIntersectionsDirectionWatcherConfig): params is TIntersectionsDirectionWatcherConfig {
  return isDefined((params as TIntersectionsDirectionWatcherConfig).origin) && isDefined((params as TIntersectionsDirectionWatcherConfig).direction);
}

export function isIntersectionsCameraWatcherConfig(params: TIntersectionsCameraWatcherConfig | TIntersectionsDirectionWatcherConfig): params is TIntersectionsCameraWatcherConfig {
  return isDefined((params as TIntersectionsCameraWatcherConfig).cameraName);
}
