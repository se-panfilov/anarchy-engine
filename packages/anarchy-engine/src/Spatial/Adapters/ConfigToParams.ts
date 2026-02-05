import type { TSpatialGridConfig, TSpatialGridParams } from '@hellpig/anarchy-engine/Spatial/Models';

export function spatialConfigToParams(config: TSpatialGridConfig): TSpatialGridParams {
  return {
    ...config
  };
}
