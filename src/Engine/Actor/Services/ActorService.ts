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
  TActorServiceWithCreate,
  TActorServiceWithCreateFromConfig,
  TActorServiceWithFactory,
  TActorServiceWithRegistry
} from '@/Engine/Actor/Models';
import type { TDisposable, TWithSceneGetterService, TWithSerializeAllEntities, TWithSerializeEntity } from '@/Engine/Mixins';
import { withFactoryService, withRegistryService, withSceneGetterService, withSerializeAllEntities } from '@/Engine/Mixins';
import { withSerializeEntity } from '@/Engine/Mixins/Generics/WithSerializeEntity';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialGridRegistry } from '@/Engine/Spatial';

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

  // eslint-disable-next-line functional/immutable-data
  const part1: TAbstractService & TActorServiceWithFactory & TActorServiceWithRegistry = Object.assign(abstractService, withFactory, withRegistry);
  const part2: TWithSceneGetterService & TWithSerializeAllEntities<TActorConfig> = Object.assign(
    withSceneGetterService(scene),
    withSerializeAllEntities<TActorConfig, TActorEntityToConfigDependencies>(registry, actorServiceDependencies)
  );
  const part3: TWithSerializeEntity<TActor, TActorEntityToConfigDependencies> & TActorServiceWithCreate & TActorServiceWithCreateFromConfig = Object.assign(
    withSerializeEntity<TActor, TActorEntityToConfigDependencies>(),
    {
      create,
      createFromList,
      createFromConfig
    }
  );

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(part1, part2, part3);
}
