import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TSpatialGridRegistry, TSpatialGridWrapper } from '@hellpig/anarchy-engine/Spatial/Models';

export function SpatialGridRegistry(): TSpatialGridRegistry {
  return AbstractEntityRegistry<TSpatialGridWrapper>(RegistryType.SpatialGrid);
}
