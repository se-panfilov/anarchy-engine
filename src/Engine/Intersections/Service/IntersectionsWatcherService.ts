import type { ICameraService } from '@/Engine/Camera';
import type {
  IIntersectionsWatcher,
  IIntersectionsWatcherConfig,
  IIntersectionsWatcherFactory,
  IIntersectionsWatcherParams,
  IIntersectionsWatcherRegistry,
  IIntersectionsWatcherService
} from '@/Engine/Intersections/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { IMouseService } from '@/Engine/Mouse';

export function IntersectionsWatcherService(factory: IIntersectionsWatcherFactory, registry: IIntersectionsWatcherRegistry): IIntersectionsWatcherService {
  factory.entityCreated$.subscribe((watcher: IIntersectionsWatcher): void => registry.add(watcher));

  const create = (params: IIntersectionsWatcherParams): IIntersectionsWatcher => factory.create(params);
  const createFromConfig = (configs: ReadonlyArray<IIntersectionsWatcherConfig>, mouseService: IMouseService, cameraService: ICameraService): void =>
    configs.forEach((config: IIntersectionsWatcherConfig): IIntersectionsWatcher => factory.create(factory.configToParams(config, mouseService, cameraService)));

  //function getWatchersForFromConfigIntersections(
  //     actorRegistry: IActorAsyncRegistry,
  //     cameraRegistry: ICameraRegistry,
  //     intersections: ReadonlyArray<IIntersectionsWatcherConfig>
  //   ): ReadonlyArray<Promise<IIntersectionsWatcher>> {
  //     return intersections.map((intersection: IIntersectionsWatcherConfig) => {
  //       const actorsPromises: ReadonlyArray<Promise<IActorWrapperAsync>> = intersection.actorNames.map((name: string): Promise<IActorWrapperAsync> => actorRegistry.findByNameAsync(name));
  //       const cameraWrapper: ICameraWrapper | undefined = cameraRegistry.findByName(intersection.cameraName);
  //       if (isNotDefined(cameraWrapper)) throw new Error(`Intersections: Cannot find camera ("${intersection.cameraName}")`);
  //
  //       return buildWatcherForActorPromises(actorsPromises, cameraWrapper);
  //     });
  //   }

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): IIntersectionsWatcherFactory => factory,
    getRegistry: (): IIntersectionsWatcherRegistry => registry,
    ...destroyable
  };
}
