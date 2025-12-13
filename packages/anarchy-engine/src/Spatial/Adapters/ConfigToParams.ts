import type { TSpatialGridConfig, TSpatialGridParams } from '@Anarchy/Engine/Spatial/Models';

export function configToParamsSpatial(config: TSpatialGridConfig): TSpatialGridParams {
  return {
    ...config
  };
}
