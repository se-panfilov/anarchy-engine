import type { TAbstractService, TRegistryPack } from '@hellpig/anarchy-engine/Abstract';
import { AbstractService } from '@hellpig/anarchy-engine/Abstract';
import type {
  TAbstractLightWrapper,
  TAnyLight,
  TAnyLightConfig,
  TAnyLightWrapper,
  TLightFactory,
  TLightRegistry,
  TLightService,
  TLightServiceDependencies,
  TLightServiceWithCreate,
  TLightServiceWithCreateFromConfig,
  TLightServiceWithFactory,
  TLightServiceWithRegistry
} from '@hellpig/anarchy-engine/Light/Models';
import type { TDisposable } from '@hellpig/anarchy-engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSceneGetterService, withSerializableEntities } from '@hellpig/anarchy-engine/Mixins';
import type { TSceneWrapper } from '@hellpig/anarchy-engine/Scene';
import { mergeAll } from '@hellpig/anarchy-engine/Utils';
import type { Subscription } from 'rxjs';

export function LightService(factory: TLightFactory, registry: TLightRegistry, dependencies: TLightServiceDependencies, scene: TSceneWrapper): TLightService {
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TAbstractLightWrapper<TAnyLight>>) => scene.addLight(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TAnyLightWrapper): void => registry.add(wrapper));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, registrySub$, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TLightServiceWithCreate = withCreateServiceMixin(factory, dependencies);
  const withCreateFromConfigService: TLightServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams, undefined);
  const withFactory: TLightServiceWithFactory = withFactoryService(factory);
  const withRegistry: TLightServiceWithRegistry = withRegistryService(registry);

  return mergeAll(
    abstractService,
    withCreateService,
    withCreateFromConfigService,
    withFactory,
    withRegistry,
    withSerializableEntities<TAnyLightWrapper, TAnyLightConfig, undefined>(registry),
    withSceneGetterService(scene)
  );
}
