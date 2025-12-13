import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Abstract';
import { AbstractService } from '@/Abstract';
import type { TDisposable } from '@/Mixins';
import { withCreateServiceMixin, withSerializableEntities } from '@/Mixins';
import { withCreateFromConfigServiceMixin } from '@/Mixins/Services/WithCreateFromConfigService';
import { withFactoryService } from '@/Mixins/Services/WithFactoryService';
import { withRegistryService } from '@/Mixins/Services/WithRegistryService';
import type {
  TSpatialGridConfig,
  TSpatialGridFactory,
  TSpatialGridRegistry,
  TSpatialGridService,
  TSpatialGridServiceWithCreate,
  TSpatialGridServiceWithCreateFromConfig,
  TSpatialGridServiceWithFactory,
  TSpatialGridServiceWithRegistry,
  TSpatialGridWrapper
} from '@/Spatial/Models';
import { mergeAll } from '@/Utils';

export function SpatialGridService(factory: TSpatialGridFactory, registry: TSpatialGridRegistry): TSpatialGridService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((spatialGrid: TSpatialGridWrapper): void => registry.add(spatialGrid));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TSpatialGridServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withCreateFromConfigService: TSpatialGridServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams, undefined);
  const withFactory: TSpatialGridServiceWithFactory = withFactoryService(factory);
  const withRegistry: TSpatialGridServiceWithRegistry = withRegistryService(registry);

  return mergeAll(abstractService, withCreateService, withCreateFromConfigService, withFactory, withRegistry, withSerializableEntities<TSpatialGridWrapper, TSpatialGridConfig, undefined>(registry));
}
