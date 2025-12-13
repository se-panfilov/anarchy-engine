import type { TSpatialGridConfig, TSpatialGridParams } from '@/Engine/Spatial/Models';

export function configToParams(config: TSpatialGridConfig): TSpatialGridParams {
  return {
    ...config
  };
}
