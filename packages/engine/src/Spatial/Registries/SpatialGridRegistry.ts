import { RegistryType } from '@/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Abstract/Registries';
import type { TSpatialGridRegistry, TSpatialGridWrapper } from '@/Spatial/Models';

export function SpatialGridRegistry(): TSpatialGridRegistry {
  return AbstractEntityRegistry<TSpatialGridWrapper>(RegistryType.SpatialGrid);
}
