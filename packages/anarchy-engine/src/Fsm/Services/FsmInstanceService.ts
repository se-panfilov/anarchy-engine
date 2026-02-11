import type { TAbstractService } from '@hellpig/anarchy-engine/Abstract';
import { AbstractService } from '@hellpig/anarchy-engine/Abstract';
import type {
  TFsmConfig,
  TFsmInstanceFactory,
  TFsmInstanceRegistry,
  TFsmInstanceService,
  TFsmInstanceServiceWithCreate,
  TFsmInstanceServiceWithFactory,
  TFsmInstanceServiceWithRegistry,
  TFsmWrapper
} from '@hellpig/anarchy-engine/Fsm/Models';
import type { TDisposable } from '@hellpig/anarchy-engine/Mixins';
import { withCreateServiceMixin, withFactoryService, withRegistryService, withSerializableEntities } from '@hellpig/anarchy-engine/Mixins';
import { mergeAll } from '@hellpig/anarchy-engine/Utils';
import type { Subscription } from 'rxjs';

export function FsmInstanceService(factory: TFsmInstanceFactory, registry: TFsmInstanceRegistry): TFsmInstanceService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((fsm: TFsmWrapper): void => registry.add(fsm));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TFsmInstanceServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withFactory: TFsmInstanceServiceWithFactory = withFactoryService(factory);
  const withRegistry: TFsmInstanceServiceWithRegistry = withRegistryService(registry);

  return mergeAll(abstractService, withCreateService, withFactory, withRegistry, withSerializableEntities<TFsmWrapper, TFsmConfig>(registry));
}
