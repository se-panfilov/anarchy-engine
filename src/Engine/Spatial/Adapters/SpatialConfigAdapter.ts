import type { TSpatialConfigToParamsDependencies, TSpatialDataConfig, TSpatialDataParams } from '@/Engine/Spatial/Models';

export function configToParams(config: TSpatialDataConfig, { spatialGridRegistry }: TSpatialConfigToParamsDependencies): TSpatialDataParams {
  return {
    ...config,
    grid: config.gridName ? spatialGridRegistry.findByName(config.gridName) : undefined
  };
}
