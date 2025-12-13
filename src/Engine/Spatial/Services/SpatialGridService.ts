import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TSpatialGridConfig, TSpatialGridFactory, TSpatialGridParams, TSpatialGridRegistry, TSpatialGridService, TSpatialGridWrapper } from '@/Engine/Spatial/Models';

export function SpatialGridService(factory: TSpatialGridFactory, registry: TSpatialGridRegistry): TSpatialGridService {
  const abstractService: TAbstractService = AbstractService();
  const factorySub$: Subscription = factory.entityCreated$.subscribe((spatialGrid: TSpatialGridWrapper): void => registry.add(spatialGrid));

  const create = (params: TSpatialGridParams): TSpatialGridWrapper => factory.create(params);
  const createFromConfig = (spatialGrids: ReadonlyArray<TSpatialGridConfig>): ReadonlyArray<TSpatialGridWrapper> =>
    spatialGrids.map((spatialGrid: TSpatialGridConfig): TSpatialGridWrapper => create(factory.configToParams(spatialGrid)));

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    factorySub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    getFactory: (): TSpatialGridFactory => factory,
    getRegistry: (): TSpatialGridRegistry => registry
  });
}
