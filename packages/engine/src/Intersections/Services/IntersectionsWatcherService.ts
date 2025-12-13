import type { TAbstractService } from '@Engine/Abstract';
import { AbstractService } from '@Engine/Abstract';
import type { TActorService } from '@Engine/Actor';
import type { TCameraService } from '@Engine/Camera';
import type {
  TAnyIntersectionsWatcher,
  TAnyIntersectionsWatcherConfig,
  TAnyIntersectionsWatcherParams,
  TIntersectionsCameraWatcher,
  TIntersectionsDirectionWatcher,
  TIntersectionsWatcherFactory,
  TIntersectionsWatcherRegistry,
  TIntersectionsWatcherService,
  TIntersectionsWatcherServiceWithFactory,
  TIntersectionsWatcherServiceWithRegistry
} from '@Engine/Intersections/Models';
import { isIntersectionsCameraWatcher, isIntersectionsDirectionWatcher } from '@Engine/Intersections/Utils';
import type { TLoopService } from '@Engine/Loop';
import type { TDisposable } from '@Engine/Mixins';
import { withFactoryService, withRegistryService, withSerializableEntities } from '@Engine/Mixins';
import type { TMouseService } from '@Engine/Mouse';
import { isDefined, mergeAll } from '@Engine/Utils';
import type { Subscription } from 'rxjs';

export function IntersectionsWatcherService(factory: TIntersectionsWatcherFactory, registry: TIntersectionsWatcherRegistry): TIntersectionsWatcherService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((watcher: TAnyIntersectionsWatcher): void => registry.add(watcher));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (params: TAnyIntersectionsWatcherParams): TAnyIntersectionsWatcher => factory.create(params, undefined);
  const createFromList = (list: ReadonlyArray<TAnyIntersectionsWatcherParams>): ReadonlyArray<TAnyIntersectionsWatcher> => list.map(create);
  const createFromConfig = (
    configs: ReadonlyArray<TAnyIntersectionsWatcherConfig>,
    mouseService: TMouseService,
    cameraService: TCameraService,
    actorService: TActorService,
    loopService: TLoopService
  ): ReadonlyArray<TAnyIntersectionsWatcher> =>
    configs.map((config: TAnyIntersectionsWatcherConfig): TAnyIntersectionsWatcher => create(factory.configToParams(config, mouseService, cameraService, actorService, loopService)));

  const withFactory: TIntersectionsWatcherServiceWithFactory = withFactoryService(factory);
  const withRegistry: TIntersectionsWatcherServiceWithRegistry = withRegistryService(registry);

  function findCameraWatcher(name: string): TIntersectionsCameraWatcher | undefined | never {
    const watcher: TAnyIntersectionsWatcher | undefined = registry.getByName(name);
    if (isDefined(watcher) && !isIntersectionsCameraWatcher(watcher)) {
      throw new Error(`[IntersectionsWatcherService]: Watcher "${watcher.name}" is not type of TIntersectionsCameraWatcher`);
    }
    return watcher;
  }

  function getCameraWatcher(name: string): TIntersectionsCameraWatcher | never {
    const watcher: TIntersectionsCameraWatcher | undefined = findCameraWatcher(name);
    if (watcher === undefined) throw new Error(`[IntersectionsWatcherService]: Cannot get camera watcher: "${name}" is not found`);
    return watcher;
  }

  function findDirectionWatcher(name: string): TIntersectionsDirectionWatcher | undefined | never {
    const watcher: TAnyIntersectionsWatcher | undefined = registry.getByName(name);
    if (isDefined(watcher) && !isIntersectionsDirectionWatcher(watcher)) {
      throw new Error(`[IntersectionsWatcherService]: Watcher "${watcher.name}" is not type of TIntersectionsDirectionWatcher`);
    }
    return watcher;
  }

  function getDirectionWatcher(name: string): TIntersectionsDirectionWatcher | never {
    const watcher: TAnyIntersectionsWatcher | undefined = findDirectionWatcher(name);
    if (watcher === undefined) throw new Error(`[IntersectionsWatcherService]: Cannot get direction watcher: "${name}" is not found`);
    return watcher;
  }

  return mergeAll(abstractService, withFactory, withRegistry, withSerializableEntities<TAnyIntersectionsWatcher, TAnyIntersectionsWatcherConfig, undefined>(registry), {
    create,
    createFromList,
    createFromConfig,
    findCameraWatcher,
    getCameraWatcher,
    findDirectionWatcher,
    getDirectionWatcher
  });
}
