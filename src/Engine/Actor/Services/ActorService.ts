import type { Subscription } from 'rxjs';

import type { TRegistryPack } from '@/Engine/Abstract';
import type { TActor, TActorConfig, TActorFactory, TActorParams, TActorRegistry, TActorService, TActorServiceDependencies } from '@/Engine/Actor/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialGridRegistry } from '@/Engine/Spatial';

export function ActorService(factory: TActorFactory, registry: TActorRegistry, actorServiceDependencies: TActorServiceDependencies, scene: TSceneWrapper): TActorService {
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TActor>): void => scene.addActor(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TActor): void => registry.add(wrapper));

  const create = (params: TActorParams): TActor => factory.create(params, actorServiceDependencies);
  const createFromConfig = (actors: ReadonlyArray<TActorConfig>): ReadonlyArray<TActor> => {
    const spatialGridRegistry: TSpatialGridRegistry = actorServiceDependencies.spatialGridService.getRegistry();
    return actors.map(
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      (config: TActorConfig): TActor => create(factory.configToParams(config, { spatialGridRegistry, models3dService: actorServiceDependencies.models3dService }))
    );
  };

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    registrySub$.unsubscribe();
    factorySub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): TActorFactory => factory,
    getRegistry: (): TActorRegistry => registry,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
