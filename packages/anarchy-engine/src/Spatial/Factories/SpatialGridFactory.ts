import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { spatialConfigToParams as configToParams } from '@hellpig/anarchy-engine/Spatial/Adapters';
import type { TSpatialGridFactory, TSpatialGridParams, TSpatialGridWrapper } from '@hellpig/anarchy-engine/Spatial/Models';
import { SpatialGridWrapper } from '@hellpig/anarchy-engine/Spatial/Wrappers';

export function SpatialGridFactory(): TSpatialGridFactory {
  const factory: TReactiveFactory<TSpatialGridWrapper, TSpatialGridParams> = ReactiveFactory(FactoryType.SpatialGrid, SpatialGridWrapper);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
