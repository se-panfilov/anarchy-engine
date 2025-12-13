import type { TActorService, TActorWrapper } from '@/Engine/Actor';
import type { TCameraService, TCameraWrapper } from '@/Engine/Camera';
import type { TIntersectionsWatcherConfig, TIntersectionsWatcherParams } from '@/Engine/Intersections/Models';
import type { TMouseService } from '@/Engine/Mouse';
import { isNotDefined } from '@/Engine/Utils';

export async function configToParamsAsync(
  config: TIntersectionsWatcherConfig,
  mouseService: TMouseService,
  cameraService: TCameraService,
  actorsService: TActorService
): Promise<TIntersectionsWatcherParams> {
  const camera: TCameraWrapper | undefined = cameraService.getRegistry().findByName(config.cameraName);
  if (isNotDefined(camera)) throw new Error(`configToParams: Cannot find camera "${config.cameraName}" for intersections watcher "${config.name}".`);
  const actorsPromises: ReadonlyArray<Promise<TActorWrapper | undefined>> = config.actorNames.map(
    (name: string): Promise<TActorWrapper | undefined> => actorsService.getRegistry().findByNameAsync(name)
  );
  const actors: ReadonlyArray<TActorWrapper> = await Promise.all(actorsPromises).then((actors: Array<TActorWrapper | undefined>): ReadonlyArray<TActorWrapper> | never => {
    if (actors.some(isNotDefined)) throw new Error(`configToParams: Cannot find actors for intersections watcher "${config.name}".`);
    return actors as ReadonlyArray<TActorWrapper>;
  });

  return {
    ...config,
    position$: mouseService.position$,
    camera,
    actors
  };
}
