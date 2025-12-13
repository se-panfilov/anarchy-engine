import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import { AbstractService } from '@Anarchy/Engine/Abstract';
import type {
  TFsmConfig,
  TFsmInstanceFactory,
  TFsmInstanceRegistry,
  TFsmInstanceServiceWithCreate,
  TFsmInstanceServiceWithFactory,
  TFsmInstanceServiceWithRegistry,
  TFsmWrapper
} from '@Anarchy/Engine/Fsm/Models';
import type { TFsmInstanceService } from '@Anarchy/Engine/Fsm/Models/TFsmInstanceService';
import type { TDisposable } from '@Anarchy/Engine/Mixins';
import { withCreateServiceMixin, withFactoryService, withRegistryService, withSerializableEntities } from '@Anarchy/Engine/Mixins';
import { mergeAll } from '@Anarchy/Engine/Utils';
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
