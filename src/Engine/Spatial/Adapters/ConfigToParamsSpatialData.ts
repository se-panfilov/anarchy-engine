import type { TSpatialConfigToParamsSpatialDataDependencies, TSpatialDataConfig, TSpatialDataParams } from '@/Engine/Spatial/Models';

export function configToParamsSpatialData(config: TSpatialDataConfig, { spatialGridRegistry }: TSpatialConfigToParamsSpatialDataDependencies): TSpatialDataParams {
  return {
    ...config,
    grid: config.grid ? spatialGridRegistry.findByName(config.grid) : undefined
  };
}
