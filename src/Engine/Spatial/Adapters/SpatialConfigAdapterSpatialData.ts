import type { TSpatialConfigToParamsSpatialDataDependencies, TSpatialDataConfig, TSpatialDataParams } from '@/Engine/Spatial/Models';

export function configToParamsSpatialData(config: TSpatialDataConfig, { spatialGridRegistry }: TSpatialConfigToParamsSpatialDataDependencies): TSpatialDataParams {
  return {
    ...config,
    grid: config.gridName ? spatialGridRegistry.findByName(config.gridName) : undefined
  };
}
