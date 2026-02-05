import type { TAbstractService } from '@hellpig/anarchy-engine/Abstract';
import { AbstractService } from '@hellpig/anarchy-engine/Abstract';
import type { TActorService } from '@hellpig/anarchy-engine/Actor';
import type { TCameraService } from '@hellpig/anarchy-engine/Camera';
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
} from '@hellpig/anarchy-engine/Intersections/Models';
import { isIntersectionsCameraWatcher, isIntersectionsDirectionWatcher } from '@hellpig/anarchy-engine/Intersections/Utils';
import type { TLoopService } from '@hellpig/anarchy-engine/Loop';
import type { TDisposable } from '@hellpig/anarchy-engine/Mixins';
import { withFactoryService, withRegistryService, withSerializableEntities } from '@hellpig/anarchy-engine/Mixins';
import type { TMouseService } from '@hellpig/anarchy-engine/Mouse';
import { mergeAll } from '@hellpig/anarchy-engine/Utils';
import { isDefined } from '@hellpig/anarchy-shared/Utils';
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
