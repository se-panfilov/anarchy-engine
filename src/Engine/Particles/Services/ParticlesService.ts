import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TMaterialRegistry } from '@/Engine/Material';
import type { TDisposable } from '@/Engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSceneGetterService, withSerializeAllEntities } from '@/Engine/Mixins';
import type {
  TParticlesConfig,
  TParticlesFactory,
  TParticlesRegistry,
  TParticlesService,
  TParticlesServiceDependencies,
  TParticlesServiceWithCreate,
  TParticlesServiceWithCreateFromConfig,
  TParticlesServiceWithFactory,
  TParticlesServiceWithRegistry,
  TParticlesWrapper
} from '@/Engine/Particles/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

export function ParticlesService(factory: TParticlesFactory, registry: TParticlesRegistry, dependencies: TParticlesServiceDependencies, scene: TSceneWrapper): TParticlesService {
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TParticlesWrapper>): void => scene.addParticles(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TParticlesWrapper): void => registry.add(wrapper));
  const materialRegistry: TMaterialRegistry = dependencies.materialService.getRegistry();

  const disposable: ReadonlyArray<TDisposable> = [registry, factory, registrySub$, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TParticlesServiceWithCreate = withCreateServiceMixin(factory, dependencies);
  const withCreateFromConfigService: TParticlesServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams, { materialRegistry });
  const withFactory: TParticlesServiceWithFactory = withFactoryService(factory);
  const withRegistry: TParticlesServiceWithRegistry = withRegistryService(registry);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(
    abstractService,
    withCreateService,
    withCreateFromConfigService,
    withFactory,
    withRegistry,
    withSerializeAllEntities<TParticlesConfig, undefined>(registry),
    withSceneGetterService(scene)
  );
}
