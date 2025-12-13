import type { TActorService, TActorWrapperAsync } from '@/Engine/Actor';
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
  const actorsPromises: ReadonlyArray<Promise<TActorWrapperAsync | undefined>> = config.actorNames.map(
    (name: string): Promise<TActorWrapperAsync | undefined> => actorsService.getRegistry().findByNameAsync(name)
  );
  const actors: ReadonlyArray<TActorWrapperAsync> = await Promise.all(actorsPromises).then((actors: Array<TActorWrapperAsync | undefined>): ReadonlyArray<TActorWrapperAsync> | never => {
    if (actors.some(isNotDefined)) throw new Error(`configToParams: Cannot find actors for intersections watcher "${config.name}".`);
    return actors as ReadonlyArray<TActorWrapperAsync>;
  });

  return {
    ...config,
    position$: mouseService.position$,
    camera,
    actors
  };
}
