import type { Subscription } from 'rxjs';

import type { TAbstractResourceAsyncRegistry, TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type {
  TFsmConfig,
  TFsmSource,
  TFsmSourceFactory,
  TFsmSourceRegistry,
  TFsmSourceService,
  TFsmSourceServiceWithCreate,
  TFsmSourceServiceWithCreateFromConfig,
  TFsmSourceServiceWithFactory,
  TFsmSourceServiceWithRegistry
} from '@/Engine/Fsm/Models';
import type { TDisposable } from '@/Engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSerializeAllResources } from '@/Engine/Mixins';

export function FsmSourceService(factory: TFsmSourceFactory, registry: TFsmSourceRegistry): TFsmSourceService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((fsm: TFsmSource): void => registry.add(fsm.name, fsm));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TFsmSourceServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withCreateFromConfigService: TFsmSourceServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams, undefined);
  const withFactory: TFsmSourceServiceWithFactory = withFactoryService(factory);
  const withRegistry: TFsmSourceServiceWithRegistry = withRegistryService(registry);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(
    abstractService,
    withCreateService,
    withCreateFromConfigService,
    withFactory,
    withRegistry,
    // TODO 15-0-0: Return type might be not TFsmConfig, but something else, check it
    withSerializeAllResources<TFsmConfig, undefined>(registry as TAbstractResourceAsyncRegistry<TFsmSource>)
  );
}
