import type { TActorService, TActorWrapper } from '@/Engine/Actor';
import type { TCameraService, TCameraWrapper } from '@/Engine/Camera';
import type { TIntersectionsWatcherConfig, TIntersectionsWatcherParams } from '@/Engine/Intersections/Models';
import type { TMouseService } from '@/Engine/Mouse';
import { isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TIntersectionsWatcherConfig, mouseService: TMouseService, cameraService: TCameraService, actorsService: TActorService): TIntersectionsWatcherParams | never {
  const camera: TCameraWrapper | undefined = cameraService.getRegistry().findByName(config.cameraName);
  if (isNotDefined(camera)) throw new Error(`configToParams: Cannot find camera "${config.cameraName}" for intersections watcher "${config.name}".`);
  const actors: ReadonlyArray<TActorWrapper | undefined> = config.actorNames.map((name: string): TActorWrapper | undefined => actorsService.getRegistry().findByName(name));
  if (actors.some(isNotDefined)) throw new Error(`configToParams: Cannot find actors for intersections watcher "${config.name}".`);

  return {
    ...config,
    position$: mouseService.position$,
    camera,
    actors
  };
}
