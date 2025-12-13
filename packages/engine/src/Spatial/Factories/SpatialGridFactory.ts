import type { TReactiveFactory } from '@/Abstract';
import { FactoryType, ReactiveFactory } from '@/Abstract';
import { configToParamsSpatial as configToParams } from '@/Spatial/Adapters';
import type { TSpatialGridFactory, TSpatialGridParams, TSpatialGridWrapper } from '@/Spatial/Models';
import { SpatialGridWrapper } from '@/Spatial/Wrappers';

export function SpatialGridFactory(): TSpatialGridFactory {
  const factory: TReactiveFactory<TSpatialGridWrapper, TSpatialGridParams> = ReactiveFactory(FactoryType.SpatialGrid, SpatialGridWrapper);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
