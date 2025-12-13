import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TActor, TActorConfig, TActorFactory, TActorParams, TActorRegistry, TActorService, TActorServiceDependencies } from '@/Engine/Actor/Models';
import type { TDisposable } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialGridRegistry } from '@/Engine/Spatial';

export function ActorService(factory: TActorFactory, registry: TActorRegistry, actorServiceDependencies: TActorServiceDependencies, scene: TSceneWrapper): TActorService {
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TActor>): void => scene.addActor(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((actor: TActor): void => registry.add(actor));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, registrySub$, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (params: TActorParams): TActor => factory.create(params, actorServiceDependencies);
  const createFromConfig = (actors: ReadonlyArray<TActorConfig>): ReadonlyArray<TActor> => {
    const spatialGridRegistry: TSpatialGridRegistry = actorServiceDependencies.spatialGridService.getRegistry();
    return actors.map(
      (config: TActorConfig): TActor =>
        create(factory.configToParams(config, { spatialGridRegistry, models3dService: actorServiceDependencies.models3dService, fsmService: actorServiceDependencies.fsmService }))
    );
  };

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    getFactory: (): TActorFactory => factory,
    getRegistry: (): TActorRegistry => registry,
    getScene: (): TSceneWrapper => scene
  });
}
