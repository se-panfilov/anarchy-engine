import type { TAbstractService } from '@hellpig/anarchy-engine/Abstract';
import { AbstractService } from '@hellpig/anarchy-engine/Abstract';
import type { TDisposable } from '@hellpig/anarchy-engine/Mixins';
import { withCreateServiceMixin, withSerializableEntities } from '@hellpig/anarchy-engine/Mixins';
import { withCreateFromConfigServiceMixin } from '@hellpig/anarchy-engine/Mixins/Services/WithCreateFromConfigService';
import { withFactoryService } from '@hellpig/anarchy-engine/Mixins/Services/WithFactoryService';
import { withRegistryService } from '@hellpig/anarchy-engine/Mixins/Services/WithRegistryService';
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
} from '@hellpig/anarchy-engine/Spatial/Models';
import { mergeAll } from '@hellpig/anarchy-engine/Utils';
import type { Subscription } from 'rxjs';

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
