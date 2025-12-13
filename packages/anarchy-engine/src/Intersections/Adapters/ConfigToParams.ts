import type { TActor, TActorService } from '@Engine/Actor';
import type { TAnyCameraWrapper, TCameraService } from '@Engine/Camera';
import type {
  TAbstractIntersectionsWatcherParams,
  TAnyIntersectionsWatcherConfig,
  TAnyIntersectionsWatcherParams,
  TIntersectionsCameraWatcherConfig,
  TIntersectionsCameraWatcherParams,
  TIntersectionsDirectionWatcherConfig,
  TIntersectionsDirectionWatcherParams,
  TIntersectionsLoop
} from '@Engine/Intersections/Models';
import { isIntersectionsCameraWatcherConfig, isIntersectionsDirectionWatcherConfig } from '@Engine/Intersections/Utils';
import type { TLoopService } from '@Engine/Loop';
import type { TMouseService } from '@Engine/Mouse';
import { isNotDefined } from '@Shared/Utils';
import { Vector3 } from 'three';

export function configToParams(
  config: TAnyIntersectionsWatcherConfig,
  mouseService: TMouseService,
  cameraService: TCameraService,
  actorsService: TActorService,
  loopService: TLoopService
): TAnyIntersectionsWatcherParams | never {
  const params: TAbstractIntersectionsWatcherParams = configToParamsAbstractIntersectionsWatcher(config, actorsService, loopService);

  let result: TAnyIntersectionsWatcherParams;
  if (isIntersectionsDirectionWatcherConfig(config)) {
    result = { ...params, ...configToParamsIntersectionsDirectionWatcher(config) };
  } else if (isIntersectionsCameraWatcherConfig(config)) {
    result = { ...params, ...configToParamsIntersectionsCameraWatcher(config, mouseService, cameraService) };
  } else {
    throw new Error(`[Intersections] configToParams: Unknown intersections watcher config type for "${(config as TAnyIntersectionsWatcherConfig).name}".`);
  }

  return result;
}

function configToParamsAbstractIntersectionsWatcher(config: TAnyIntersectionsWatcherConfig, actorsService: TActorService, loopService: TLoopService): TAbstractIntersectionsWatcherParams {
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
