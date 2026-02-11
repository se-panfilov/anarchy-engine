import type { TSpatialGridConfig, TSpatialGridParams } from '@Anarchy/Engine/Spatial/Models';

export function spatialConfigToParams(config: TSpatialGridConfig): TSpatialGridParams {
  return {
    ...config
  };
}
