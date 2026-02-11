import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TSpatialGridRegistry, TSpatialGridWrapper } from '@Anarchy/Engine/Spatial/Models';

export function SpatialGridRegistry(): TSpatialGridRegistry {
  return AbstractEntityRegistry<TSpatialGridWrapper>(RegistryType.SpatialGrid);
}
