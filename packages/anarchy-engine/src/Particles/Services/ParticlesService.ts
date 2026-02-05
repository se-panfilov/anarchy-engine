import type { TAbstractService, TRegistryPack } from '@hellpig/anarchy-engine/Abstract';
import { AbstractService } from '@hellpig/anarchy-engine/Abstract';
import type { TMaterialRegistry } from '@hellpig/anarchy-engine/Material';
import type { TDisposable } from '@hellpig/anarchy-engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSceneGetterService, withSerializableEntities } from '@hellpig/anarchy-engine/Mixins';
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
} from '@hellpig/anarchy-engine/Particles/Models';
import type { TSceneWrapper } from '@hellpig/anarchy-engine/Scene';
import { mergeAll } from '@hellpig/anarchy-engine/Utils';
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
