import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type {
  TAbstractLightWrapper,
  TAnyLight,
  TAnyLightConfig,
  TLightFactory,
  TLightRegistry,
  TLightService,
  TLightServiceDependencies,
  TLightServiceWithCreate,
  TLightServiceWithCreateFromConfig,
  TLightServiceWithFactory,
  TLightServiceWithRegistry
} from '@/Engine/Light/Models';
import type { TDisposable } from '@/Engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSceneGetterService, withSerializeAllEntities } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import { mergeAll } from '@/Engine/Utils';

export function LightService(factory: TLightFactory, registry: TLightRegistry, dependencies: TLightServiceDependencies, scene: TSceneWrapper): TLightService {
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TAbstractLightWrapper<TAnyLight>>) => scene.addLight(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TAbstractLightWrapper<TAnyLight>): void => registry.add(wrapper));
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
    withSerializeAllEntities<TAnyLightConfig, undefined>(registry),
    withSceneGetterService(scene)
  );
}
