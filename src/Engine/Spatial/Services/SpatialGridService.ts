import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSpatialGridConfig, TSpatialGridFactory, TSpatialGridParams, TSpatialGridRegistry, TSpatialGridService, TSpatialGridWrapper } from '@/Engine/Spatial/Models';

export function SpatialGridService(factory: TSpatialGridFactory, registry: TSpatialGridRegistry): TSpatialGridService {
  factory.entityCreated$.subscribe((spatialGrid: TSpatialGridWrapper): void => registry.add(spatialGrid));

  const create = (params: TSpatialGridParams): TSpatialGridWrapper => factory.create(params);
  const createFromConfig = (spatialGrids: ReadonlyArray<TSpatialGridConfig>): void =>
    spatialGrids.forEach((spatialGrid: TSpatialGridConfig): TSpatialGridWrapper => factory.create(factory.configToParams(spatialGrid)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): TSpatialGridFactory => factory,
    getRegistry: (): TSpatialGridRegistry => registry,
    ...destroyable
  };
}
