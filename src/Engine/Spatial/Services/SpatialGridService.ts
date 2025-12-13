import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSpatialGridConfig, TSpatialGridFactory, TSpatialGridParams, TSpatialGridRegistry, TSpatialGridService, TSpatialGridWrapper } from '@/Engine/Spatial/Models';

export function SpatialGridService(factory: TSpatialGridFactory, registry: TSpatialGridRegistry): TSpatialGridService {
  factory.entityCreated$.subscribe((spatialGrid: TSpatialGridWrapper): void => registry.add(spatialGrid));

  const create = (params: TSpatialGridParams): TSpatialGridWrapper => factory.create(params);
  const createFromConfig = (spatialGrids: ReadonlyArray<TSpatialGridConfig>): ReadonlyArray<TSpatialGridWrapper> =>
    spatialGrids.map((spatialGrid: TSpatialGridConfig): TSpatialGridWrapper => create(factory.configToParams(spatialGrid)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroy$.subscribe((): void => {
    factory.destroy$.next();
    registry.destroy$.next();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): TSpatialGridFactory => factory,
    getRegistry: (): TSpatialGridRegistry => registry,
    ...destroyable
  };
}
