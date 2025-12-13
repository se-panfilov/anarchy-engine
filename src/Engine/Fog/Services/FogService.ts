import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TFogFactory, TFogRegistry, TFogService, TFogServiceWithCreate, TFogServiceWithCreateFromConfig, TFogServiceWithFactory, TFogServiceWithRegistry, TFogWrapper } from '@/Engine/Fog/Models';
import type { TDisposable } from '@/Engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';

export function FogService(factory: TFogFactory, registry: TFogRegistry, scene: TSceneWrapper): TFogService {
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TFogWrapper>) => scene.setFog(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((fog: TFogWrapper): void => registry.add(fog));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, registrySub$, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TFogServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withCreateFromConfigService: TFogServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams);
  const withFactory: TFogServiceWithFactory = withFactoryService(factory);
  const withRegistry: TFogServiceWithRegistry = withRegistryService(registry);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withCreateService, withCreateFromConfigService, withFactory, withRegistry, {
    getScene: (): TSceneWrapper => scene
  });
}
