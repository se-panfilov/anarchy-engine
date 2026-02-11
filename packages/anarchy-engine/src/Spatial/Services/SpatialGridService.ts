import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import { AbstractService } from '@Anarchy/Engine/Abstract';
import type { TDisposable } from '@Anarchy/Engine/Mixins';
import { withCreateServiceMixin, withSerializableEntities } from '@Anarchy/Engine/Mixins';
import { withCreateFromConfigServiceMixin } from '@Anarchy/Engine/Mixins/Services/WithCreateFromConfigService';
import { withFactoryService } from '@Anarchy/Engine/Mixins/Services/WithFactoryService';
import { withRegistryService } from '@Anarchy/Engine/Mixins/Services/WithRegistryService';
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
} from '@Anarchy/Engine/Spatial/Models';
import { mergeAll } from '@Anarchy/Engine/Utils';
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
