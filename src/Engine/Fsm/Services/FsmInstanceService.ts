import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TFsmConfig, TFsmInstanceServiceWithCreate, TFsmInstanceServiceWithFactory, TFsmInstanceServiceWithRegistry } from '@/Engine/Fsm';
import type { TFsmInstanceFactory, TFsmInstanceRegistry, TFsmWrapper } from '@/Engine/Fsm/Models';
import type { TFsmInstanceService } from '@/Engine/Fsm/Models/TFsmInstanceService';
import type { TDisposable } from '@/Engine/Mixins';
import { withCreateServiceMixin, withFactoryService, withRegistryService, withSerializeAllEntities } from '@/Engine/Mixins';

export function FsmInstanceService(factory: TFsmInstanceFactory, registry: TFsmInstanceRegistry): TFsmInstanceService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((fsm: TFsmWrapper): void => registry.add(fsm));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TFsmInstanceServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withFactory: TFsmInstanceServiceWithFactory = withFactoryService(factory);
  const withRegistry: TFsmInstanceServiceWithRegistry = withRegistryService(registry);

  // TODO 15-0-0: Return type might be not TFsmConfig, but something else, check it
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withCreateService, withFactory, withRegistry, withSerializeAllEntities<TFsmConfig, undefined>(registry));
}
