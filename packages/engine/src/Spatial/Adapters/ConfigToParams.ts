import type { TSpatialGridConfig, TSpatialGridParams } from '@/Spatial/Models';

export function configToParamsSpatial(config: TSpatialGridConfig): TSpatialGridParams {
  return {
    ...config
  };
}
