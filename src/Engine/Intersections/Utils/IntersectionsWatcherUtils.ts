import { Vector3 } from 'three/src/math/Vector3';

import type {
  TIntersectionsCameraWatcher,
  TIntersectionsCameraWatcherConfig,
  TIntersectionsCameraWatcherParams,
  TIntersectionsDirectionWatcher,
  TIntersectionsDirectionWatcherConfig,
  TIntersectionsDirectionWatcherParams
} from '@/Engine/Intersections/Models';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
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
  return isDefined((watcher as TIntersectionsDirectionWatcher).origin$) && isDefined((watcher as TIntersectionsDirectionWatcher).direction$);
}

export function isIntersectionsCameraWatcher(watcher: TIntersectionsCameraWatcher | TIntersectionsDirectionWatcher): watcher is TIntersectionsCameraWatcher {
  return isDefined((watcher as TIntersectionsCameraWatcher).getCamera);
}

export function getChangedOriginAndDirection(
  tmpOrigin: Float32Array,
  tmpDirection: Float32Array,
  prevOrigin: Float32Array,
  prevDirection: Float32Array,
  origin: TReadonlyVector3,
  direction: TReadonlyVector3,
  threshold: number
): Readonly<{ origin: TReadonlyVector3; direction: TReadonlyVector3 }> | undefined {
  // eslint-disable-next-line functional/immutable-data
  tmpOrigin[0] = origin.x;
  // eslint-disable-next-line functional/immutable-data
  tmpOrigin[1] = origin.y;
  // eslint-disable-next-line functional/immutable-data
  tmpOrigin[2] = origin.z;

  // eslint-disable-next-line functional/immutable-data
  tmpDirection[0] = direction.x;
  // eslint-disable-next-line functional/immutable-data
  tmpDirection[1] = direction.y;
  // eslint-disable-next-line functional/immutable-data
  tmpDirection[2] = direction.z;

  const originChanged: boolean = Math.abs(tmpOrigin[0] - prevOrigin[0]) > threshold || Math.abs(tmpOrigin[1] - prevOrigin[1]) > threshold || Math.abs(tmpOrigin[2] - prevOrigin[2]) > threshold;

  const directionChanged: boolean =
    Math.abs(tmpDirection[0] - prevDirection[0]) > threshold || Math.abs(tmpDirection[1] - prevDirection[1]) > threshold || Math.abs(tmpDirection[2] - prevDirection[2]) > threshold;

  if (!originChanged && !directionChanged) return undefined;

  prevOrigin.set(tmpOrigin);
  prevDirection.set(tmpDirection);

  return {
    origin: new Vector3(tmpOrigin[0], tmpOrigin[1], tmpOrigin[2]) as TReadonlyVector3,
    direction: new Vector3(tmpDirection[0], tmpDirection[1], tmpDirection[2]) as TReadonlyVector3
  };
}
