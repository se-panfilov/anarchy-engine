import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TDisposable } from '@/Engine/Mixins';
import { withCreateServiceMixin } from '@/Engine/Mixins';
import { withCreateFromConfigServiceMixin } from '@/Engine/Mixins/Services/WithCreateFromConfigService';
import { withFactoryService } from '@/Engine/Mixins/Services/WithFactoryService';
import { withRegistryService } from '@/Engine/Mixins/Services/WithRegistryService';
import type {
  TSpatialGridFactory,
  TSpatialGridRegistry,
  TSpatialGridService,
  TSpatialGridServiceWithCreate,
  TSpatialGridServiceWithCreateFromConfig,
  TSpatialGridServiceWithFactory,
  TSpatialGridServiceWithRegistry,
  TSpatialGridWrapper
} from '@/Engine/Spatial/Models';

export function SpatialGridService(factory: TSpatialGridFactory, registry: TSpatialGridRegistry): TSpatialGridService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((spatialGrid: TSpatialGridWrapper): void => registry.add(spatialGrid));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TSpatialGridServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withCreateFromConfigService: TSpatialGridServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams);
  const withFactory: TSpatialGridServiceWithFactory = withFactoryService(factory);
  const withRegistry: TSpatialGridServiceWithRegistry = withRegistryService(registry);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withCreateService, withCreateFromConfigService, withFactory, withRegistry);
}
