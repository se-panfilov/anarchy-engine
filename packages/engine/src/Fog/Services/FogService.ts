import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Abstract';
import { AbstractService } from '@/Abstract';
import type {
  TFogConfig,
  TFogFactory,
  TFogRegistry,
  TFogService,
  TFogServiceWithCreate,
  TFogServiceWithCreateFromConfig,
  TFogServiceWithFactory,
  TFogServiceWithRegistry,
  TFogWrapper
} from '@/Fog/Models';
import type { TDisposable } from '@/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSceneGetterService, withSerializableEntities } from '@/Mixins';
import type { TSceneWrapper } from '@/Scene';
import { mergeAll } from '@/Utils';

export function FogService(factory: TFogFactory, registry: TFogRegistry, scene: TSceneWrapper): TFogService {
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TFogWrapper>) => scene.setFog(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((fog: TFogWrapper): void => registry.add(fog));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, registrySub$, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TFogServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withCreateFromConfigService: TFogServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams, undefined);
  const withFactory: TFogServiceWithFactory = withFactoryService(factory);
  const withRegistry: TFogServiceWithRegistry = withRegistryService(registry);

  return mergeAll(
    abstractService,
    withCreateService,
    withCreateFromConfigService,
    withFactory,
    withRegistry,
    withSerializableEntities<TFogWrapper, TFogConfig, undefined>(registry),
    withSceneGetterService(scene)
  );
}
