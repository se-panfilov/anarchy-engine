import { Vector3 } from 'three/src/math/Vector3';

import type { TActor, TActorService } from '@/Engine/Actor';
import type { TAnyCameraWrapper, TCameraService } from '@/Engine/Camera';
import type {
  TAbstractIntersectionsWatcherParams,
  TAnyIntersectionsWatcherConfig,
  TAnyIntersectionsWatcherParams,
  TIntersectionsCameraWatcherConfig,
  TIntersectionsCameraWatcherParams,
  TIntersectionsDirectionWatcherConfig,
  TIntersectionsDirectionWatcherParams,
  TIntersectionsLoop
} from '@/Engine/Intersections/Models';
import type { TLoopService } from '@/Engine/Loop';
import type { TMouseService } from '@/Engine/Mouse';
import { isNotDefined } from '@/Engine/Utils';

export function configToParams(
  config: TAnyIntersectionsWatcherConfig,
  mouseService: TMouseService,
  cameraService: TCameraService,
  actorsService: TActorService,
  loopService: TLoopService
): TAnyIntersectionsWatcherParams | never {
  const camera: TAnyCameraWrapper = cameraService.getRegistry().getByName(config.cameraName);

  const abstractParams: TAnyIntersectionsWatcherParams = configToParamsAbstractIntersectionsWatcher(config, mouseService, actorsService, loopService);
}

function configToParamsAbstractIntersectionsWatcher(
  config: TAnyIntersectionsWatcherConfig,
  mouseService: TMouseService,
  actorsService: TActorService,
  loopService: TLoopService
): TAnyIntersectionsWatcherParams {
  const actors: ReadonlyArray<TActor> = config.actorNames.map((name: string): TActor => actorsService.getRegistry().getByName(name));

  const intersectionsLoop: TIntersectionsLoop | undefined = loopService.getIntersectionsLoop(config.intersectionsLoop);
  if (isNotDefined(intersectionsLoop)) throw new Error(`configToParams: Cannot find loop "${config.intersectionsLoop}" for intersections watcher "${config.name}".`);

  return {
    ...config,
    actors,
    intersectionsLoop
  };
}

function configToParamsIntersectionsCameraWatcher(
  config: TIntersectionsCameraWatcherConfig,
  mouseService: TMouseService,
  cameraService: TCameraService
): Omit<TIntersectionsCameraWatcherParams, keyof TAbstractIntersectionsWatcherParams> {
  const camera: TAnyCameraWrapper = cameraService.getRegistry().getByName(config.cameraName);

  return {
    camera,
    position$: mouseService.normalizedPosition$
  };
}

function configToParamsIntersectionsDirectionWatcher(config: TIntersectionsDirectionWatcherConfig): Omit<TIntersectionsDirectionWatcherParams, keyof TAbstractIntersectionsWatcherParams> {
  return {
    origin: new Vector3().copy(config.origin),
    direction: new Vector3().copy(config.direction)
  };
}
