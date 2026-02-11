import type { TAbstractService, TRegistryPack } from '@Anarchy/Engine/Abstract';
import { AbstractService } from '@Anarchy/Engine/Abstract';
import type { TMaterialRegistry } from '@Anarchy/Engine/Material';
import type { TDisposable } from '@Anarchy/Engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSceneGetterService, withSerializableEntities } from '@Anarchy/Engine/Mixins';
import type {
  TParticlesConfig,
  TParticlesConfigToParamsDependencies,
  TParticlesFactory,
  TParticlesRegistry,
  TParticlesService,
  TParticlesServiceDependencies,
  TParticlesServiceWithCreate,
  TParticlesServiceWithCreateFromConfig,
  TParticlesServiceWithFactory,
  TParticlesServiceWithRegistry,
  TParticlesWrapper
} from '@Anarchy/Engine/Particles/Models';
import type { TSceneWrapper } from '@Anarchy/Engine/Scene';
import { mergeAll } from '@Anarchy/Engine/Utils';
import type { Subscription } from 'rxjs';

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

  return mergeAll(
    abstractService,
    withCreateService,
    withCreateFromConfigService,
    withFactory,
    withRegistry,
    withSerializableEntities<TParticlesWrapper, TParticlesConfig, TParticlesConfigToParamsDependencies>(registry, { materialRegistry }),

    withSceneGetterService(scene)
  );
}
