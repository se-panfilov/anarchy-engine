import { RegistryType } from '@Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@Engine/Abstract/Registries';
import type { TSpatialGridRegistry, TSpatialGridWrapper } from '@Engine/Spatial/Models';

export function SpatialGridRegistry(): TSpatialGridRegistry {
  return AbstractEntityRegistry<TSpatialGridWrapper>(RegistryType.SpatialGrid);
}
