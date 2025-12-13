import type { TReactiveFactory } from '@Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Abstract';
import { configToParamsSpatial as configToParams } from '@Engine/Spatial/Adapters';
import type { TSpatialGridFactory, TSpatialGridParams, TSpatialGridWrapper } from '@Engine/Spatial/Models';
import { SpatialGridWrapper } from '@Engine/Spatial/Wrappers';

export function SpatialGridFactory(): TSpatialGridFactory {
  const factory: TReactiveFactory<TSpatialGridWrapper, TSpatialGridParams> = ReactiveFactory(FactoryType.SpatialGrid, SpatialGridWrapper);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
