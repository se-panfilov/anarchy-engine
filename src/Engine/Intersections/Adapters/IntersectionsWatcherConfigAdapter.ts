import type { TActor, TActorService } from '@/Engine/Actor';
import type { TCameraService, TCameraWrapper } from '@/Engine/Camera';
import type { TIntersectionsWatcherConfig, TIntersectionsWatcherParams } from '@/Engine/Intersections/Models';
import type { TMouseService } from '@/Engine/Mouse';
import { isAllDefined, isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TIntersectionsWatcherConfig, mouseService: TMouseService, cameraService: TCameraService, actorsService: TActorService): TIntersectionsWatcherParams | never {
  const camera: TCameraWrapper | undefined = cameraService.getRegistry().findByName(config.cameraName);
  if (isNotDefined(camera)) throw new Error(`configToParams: Cannot find camera "${config.cameraName}" for intersections watcher "${config.name}".`);
  const actors: ReadonlyArray<TActor | undefined> = config.actorNames.map((name: string): TActor | undefined => actorsService.getRegistry().findByName(name));
  if (!isAllDefined(actors)) throw new Error(`configToParams: Cannot find actors for intersections watcher "${config.name}".`);

  return {
    ...config,
    position$: mouseService.position$,
    camera,
    actors
  };
}
