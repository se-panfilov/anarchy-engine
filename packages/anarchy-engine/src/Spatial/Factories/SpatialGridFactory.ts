import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { configToParamsSpatial as configToParams } from '@Anarchy/Engine/Spatial/Adapters';
import type { TSpatialGridFactory, TSpatialGridParams, TSpatialGridWrapper } from '@Anarchy/Engine/Spatial/Models';
import { SpatialGridWrapper } from '@Anarchy/Engine/Spatial/Wrappers';

export function SpatialGridFactory(): TSpatialGridFactory {
  const factory: TReactiveFactory<TSpatialGridWrapper, TSpatialGridParams> = ReactiveFactory(FactoryType.SpatialGrid, SpatialGridWrapper);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
