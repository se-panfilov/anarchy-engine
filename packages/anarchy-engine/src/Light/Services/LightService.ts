import type { TAbstractService, TRegistryPack } from '@Anarchy/Engine/Abstract';
import { AbstractService } from '@Anarchy/Engine/Abstract';
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
} from '@Anarchy/Engine/Light/Models';
import type { TDisposable } from '@Anarchy/Engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSceneGetterService, withSerializableEntities } from '@Anarchy/Engine/Mixins';
import type { TSceneWrapper } from '@Anarchy/Engine/Scene';
import { mergeAll } from '@Anarchy/Engine/Utils';
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
