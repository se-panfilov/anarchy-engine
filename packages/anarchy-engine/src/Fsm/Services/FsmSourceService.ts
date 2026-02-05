import type { TAbstractService } from '@hellpig/anarchy-engine/Abstract';
import { AbstractService } from '@hellpig/anarchy-engine/Abstract';
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
} from '@hellpig/anarchy-engine/Fsm/Models';
import type { TDisposable } from '@hellpig/anarchy-engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSerializableEntities } from '@hellpig/anarchy-engine/Mixins';
import { mergeAll } from '@hellpig/anarchy-engine/Utils';
import type { Subscription } from 'rxjs';

export function FsmSourceService(factory: TFsmSourceFactory, registry: TFsmSourceRegistry): TFsmSourceService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((fsm: TFsmSource): void => registry.add(fsm.name, fsm));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TFsmSourceServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withCreateFromConfigService: TFsmSourceServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams, undefined);
  const withFactory: TFsmSourceServiceWithFactory = withFactoryService(factory);
  const withRegistry: TFsmSourceServiceWithRegistry = withRegistryService(registry);

  return mergeAll(abstractService, withCreateService, withCreateFromConfigService, withFactory, withRegistry, withSerializableEntities<TFsmSource, TFsmConfig>(registry));
}
