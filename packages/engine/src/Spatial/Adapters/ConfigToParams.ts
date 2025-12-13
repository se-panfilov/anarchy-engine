import type { TSpatialGridConfig, TSpatialGridParams } from '@Engine/Spatial/Models';

export function configToParamsSpatial(config: TSpatialGridConfig): TSpatialGridParams {
  return {
    ...config
  };
}
