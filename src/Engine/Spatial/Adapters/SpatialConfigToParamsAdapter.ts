import type { TSpatialDataConfig, TSpatialDataParams } from '@/Engine/Spatial/Models';

export function spatialConfigToParams(config: TSpatialDataConfig): TSpatialDataParams {
  return {
    ...config,
    // TODO (S.Panfilov) CWP add spatialGridRegistry and factory
    grid: config.gridName ? spatialGridRegistry.findByName(config.gridName) : undefined
  };
}
