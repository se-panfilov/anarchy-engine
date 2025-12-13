import type { TSpatialConfigToParamsSpatialDataDependencies, TSpatialDataConfig, TSpatialDataParams } from '@/Spatial/Models';

export function configToParamsSpatialData(config: TSpatialDataConfig, { spatialGridRegistry }: TSpatialConfigToParamsSpatialDataDependencies): TSpatialDataParams {
  return {
    ...config,
    grid: config.grid ? spatialGridRegistry.getByName(config.grid) : undefined
  };
}
