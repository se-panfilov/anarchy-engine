import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type {
  TActor,
  TActorConfig,
  TActorEntityToConfigDependencies,
  TActorFactory,
  TActorParams,
  TActorRegistry,
  TActorService,
  TActorServiceDependencies,
  TActorServiceWithFactory,
  TActorServiceWithRegistry
} from '@/Engine/Actor/Models';
import type { TDisposable } from '@/Engine/Mixins';
import { withFactoryService, withRegistryService, withSceneGetterService, withSerializableEntities } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialGridRegistry } from '@/Engine/Spatial';
import { mergeAll } from '@/Engine/Utils';

export function ActorService(factory: TActorFactory, registry: TActorRegistry, actorServiceDependencies: TActorServiceDependencies, scene: TSceneWrapper): TActorService {
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TActor>): void => scene.addActor(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((actor: TActor): void => registry.add(actor));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, registrySub$, factorySub$, actorServiceDependencies.model3dToActorConnectionRegistry];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (params: TActorParams): TActor => factory.create(params, actorServiceDependencies);
  const createFromList = (list: ReadonlyArray<TActorParams>): ReadonlyArray<TActor> => list.map(create);
  const createFromConfig = (actors: ReadonlyArray<TActorConfig>): ReadonlyArray<TActor> => {
    const spatialGridRegistry: TSpatialGridRegistry = actorServiceDependencies.spatialGridService.getRegistry();
    return actors.map(
      (config: TActorConfig): TActor =>
        create(
          factory.configToParams(config, {
            spatialGridRegistry,
            models3dService: actorServiceDependencies.models3dService,
            fsmService: actorServiceDependencies.fsmService,
            physicsBodyService: actorServiceDependencies.physicsBodyService
          })
        )
    );
  };

  const withFactory: TActorServiceWithFactory = withFactoryService(factory);
  const withRegistry: TActorServiceWithRegistry = withRegistryService(registry);

  return mergeAll(
    abstractService,
    withFactory,
    withRegistry,
    withSceneGetterService(scene),
    withSerializableEntities<TActor, TActorConfig, TActorEntityToConfigDependencies>(registry, actorServiceDependencies),
    {
      create,
      createFromList,
      createFromConfig
    }
  );
}
