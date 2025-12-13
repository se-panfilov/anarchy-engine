import type { TSpatialDataConfig, TSpatialDataParams } from '@/Engine/Spatial/Models';

export function spatialConfigToParams(config: TSpatialDataConfig): TSpatialDataParams {
  return {
    // spatial ? { ...spatial, tree: spatial.tree } : undefined
  };
}
