import type { TActor, TActorService } from '@/Engine/Actor';
import type { TAnyCameraWrapper, TCameraService } from '@/Engine/Camera';
import type { TIntersectionsLoop, TIntersectionsWatcherConfig, TIntersectionsWatcherParams } from '@/Engine/Intersections/Models';
import type { TLoopService } from '@/Engine/Loop';
import type { TMouseService } from '@/Engine/Mouse';
import { isNotDefined } from '@/Engine/Utils';

export function configToParams(
  config: TIntersectionsWatcherConfig,
  mouseService: TMouseService,
  cameraService: TCameraService,
  actorsService: TActorService,
  loopService: TLoopService
): TIntersectionsWatcherParams | never {
  const camera: TAnyCameraWrapper = cameraService.getRegistry().getByName(config.cameraName);
  const actors: ReadonlyArray<TActor> = config.actorNames.map((name: string): TActor => actorsService.getRegistry().getByName(name));

  const intersectionsLoop: TIntersectionsLoop | undefined = loopService.getIntersectionsLoop(config.intersectionsLoop);
  if (isNotDefined(intersectionsLoop)) throw new Error(`configToParams: Cannot find loop "${config.intersectionsLoop}" for intersections watcher "${config.name}".`);

  return {
    ...config,
    position$: mouseService.normalizedPosition$,
    camera,
    actors,
    intersectionsLoop
  };
}
