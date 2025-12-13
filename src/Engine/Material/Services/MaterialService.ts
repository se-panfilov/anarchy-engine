import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type {
  TMaterialFactory,
  TMaterialRegistry,
  TMaterialService,
  TMaterialServiceDependencies,
  TMaterialServiceWithCreate,
  TMaterialServiceWithCreateFromConfig,
  TMaterialServiceWithFactory,
  TMaterialServiceWithRegistry,
  TMaterialWrapper
} from '@/Engine/Material/Models';
import type { TDisposable } from '@/Engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService } from '@/Engine/Mixins';

export function MaterialService(factory: TMaterialFactory, registry: TMaterialRegistry, dependencies: TMaterialServiceDependencies): TMaterialService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TMaterialWrapper): void => registry.add(wrapper));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TMaterialServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withCreateFromConfigService: TMaterialServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams, dependencies);
  const withFactory: TMaterialServiceWithFactory = withFactoryService(factory);
  const withRegistry: TMaterialServiceWithRegistry = withRegistryService(registry);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withCreateService, withCreateFromConfigService, withFactory, withRegistry);
}
