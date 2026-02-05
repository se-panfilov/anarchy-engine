import type { TAbstractService, TRegistryPack } from '@hellpig/anarchy-engine/Abstract';
import { AbstractService } from '@hellpig/anarchy-engine/Abstract';
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
} from '@hellpig/anarchy-engine/Fog/Models';
import type { TDisposable } from '@hellpig/anarchy-engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSceneGetterService, withSerializableEntities } from '@hellpig/anarchy-engine/Mixins';
import type { TSceneWrapper } from '@hellpig/anarchy-engine/Scene';
import { mergeAll } from '@hellpig/anarchy-engine/Utils';
import type { Subscription } from 'rxjs';

export function FogService(factory: TFogFactory, registry: TFogRegistry, scene: TSceneWrapper): TFogService {
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TFogWrapper>): void => scene.setFog(value));
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
