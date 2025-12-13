import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type {
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
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService } from '@/Engine/Mixins';

export function FsmSourceService(factory: TFsmSourceFactory, registry: TFsmSourceRegistry): TFsmSourceService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((fsm: TFsmSource): void => registry.add(fsm.name, fsm));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TFsmSourceServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withCreateFromConfigService: TFsmSourceServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams);
  const withFactory: TFsmSourceServiceWithFactory = withFactoryService(factory);
  const withRegistry: TFsmSourceServiceWithRegistry = withRegistryService(registry);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withCreateService, withCreateFromConfigService, withFactory, withRegistry);
}
