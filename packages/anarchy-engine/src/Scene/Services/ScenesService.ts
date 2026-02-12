import type { TAbstractService, TRegistryPack } from '@Anarchy/Engine/Abstract';
import { AbstractService } from '@Anarchy/Engine/Abstract';
import type { TDisposable, TWithActiveMixinResult } from '@Anarchy/Engine/Mixins';
import { withActiveEntityServiceMixin, withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSerializableEntities } from '@Anarchy/Engine/Mixins';
import type {
  TSceneConfig,
  TSceneFactory,
  TSceneRegistry,
  TScenesService,
  TScenesServiceWithCreate,
  TScenesServiceWithCreateFromConfig,
  TScenesServiceWithFactory,
  TScenesServiceWithRegistry,
  TSceneWrapper
} from '@Anarchy/Engine/Scene/Models';
import { mergeAll } from '@Anarchy/Engine/Utils';
import type { Subscription } from 'rxjs';

export function ScenesService(factory: TSceneFactory, registry: TSceneRegistry): TScenesService {
  const withActive: TWithActiveMixinResult<TSceneWrapper> = withActiveEntityServiceMixin<TSceneWrapper>(registry);
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TSceneWrapper>): void => {
    if (value.isActive()) withActive.active$.next(value);
  });

  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TSceneWrapper): void => registry.add(wrapper));

  const disposable: ReadonlyArray<TDisposable> = [registry, factory, registrySub$, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TScenesServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withCreateFromConfigService: TScenesServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams, undefined);
  const withFactory: TScenesServiceWithFactory = withFactoryService(factory);
  const withRegistry: TScenesServiceWithRegistry = withRegistryService(registry);

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    withActive.active$.complete();
  });

  return mergeAll(
    abstractService,
    withCreateService,
    withCreateFromConfigService,
    withFactory,
    withRegistry,
    withSerializableEntities<TSceneWrapper, TSceneConfig, undefined>(registry),

    {
      setActive: withActive.setActive,
      findActive: withActive.findActive,
      getActive: withActive.getActive,
      active$: withActive.active$
    }
  );
}
