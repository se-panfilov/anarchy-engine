import type { TSpatialConfigToParamsSpatialDataDependencies, TSpatialDataConfig, TSpatialDataParams } from '@hellpig/anarchy-engine/Spatial/Models';

export function spatialDataConfigToParams(config: TSpatialDataConfig, { spatialGridRegistry }: TSpatialConfigToParamsSpatialDataDependencies): TSpatialDataParams {
  return {
    ...config,
    grid: config.grid ? spatialGridRegistry.getByName(config.grid) : undefined
  };
}
