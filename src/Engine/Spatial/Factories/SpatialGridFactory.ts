import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParamsSpatial as configToParams } from '@/Engine/Spatial/Adapters';
import type { TSpatialGridFactory, TSpatialGridParams, TSpatialGridWrapper } from '@/Engine/Spatial/Models';
import { SpatialGridWrapper } from '@/Engine/Spatial/Wrappers';

const factory: TReactiveFactory<TSpatialGridWrapper, TSpatialGridParams> = ReactiveFactory(FactoryType.SpatialGrid, SpatialGridWrapper);
export const SpatialGridFactory = (): TSpatialGridFactory => ({ ...factory, configToParams });
