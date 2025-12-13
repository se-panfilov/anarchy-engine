import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TDisposable } from '@/Engine/Mixins';
import type { TSpatialGridConfig, TSpatialGridFactory, TSpatialGridParams, TSpatialGridRegistry, TSpatialGridService, TSpatialGridWrapper } from '@/Engine/Spatial/Models';

export function SpatialGridService(factory: TSpatialGridFactory, registry: TSpatialGridRegistry): TSpatialGridService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((spatialGrid: TSpatialGridWrapper): void => registry.add(spatialGrid));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (params: TSpatialGridParams): TSpatialGridWrapper => factory.create(params);
  const createFromConfig = (spatialGrids: ReadonlyArray<TSpatialGridConfig>): ReadonlyArray<TSpatialGridWrapper> =>
    spatialGrids.map((spatialGrid: TSpatialGridConfig): TSpatialGridWrapper => create(factory.configToParams(spatialGrid)));

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    getFactory: (): TSpatialGridFactory => factory,
    getRegistry: (): TSpatialGridRegistry => registry
  });
}
