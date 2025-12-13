import type { IActorService, IActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraService, ICameraWrapper } from '@/Engine/Camera';
import type { IIntersectionsWatcherConfig, IIntersectionsWatcherParams } from '@/Engine/Intersections/Models';
import type { IMouseService } from '@/Engine/Mouse';
import { isNotDefined } from '@/Engine/Utils';

export async function configToParamsAsync(
  config: IIntersectionsWatcherConfig,
  mouseService: IMouseService,
  cameraService: ICameraService,
  actorsService: IActorService
): Promise<IIntersectionsWatcherParams> {
  const camera: ICameraWrapper | undefined = cameraService.getRegistry().findByName(config.cameraName);
  if (isNotDefined(camera)) throw new Error(`configToParams: Cannot find camera "${config.cameraName}" for intersections watcher "${config.name}".`);
  const actorsPromises: ReadonlyArray<Promise<IActorWrapperAsync>> = config.actorNames.map((name: string): Promise<IActorWrapperAsync> => actorsService.getRegistry().findByNameAsync(name));
  const actors: ReadonlyArray<IActorWrapperAsync> = await Promise.all(actorsPromises);

  return {
    ...config,
    position$: mouseService.position$,
    camera,
    actors
  };
}
