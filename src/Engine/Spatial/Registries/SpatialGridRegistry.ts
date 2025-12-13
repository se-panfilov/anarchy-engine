import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registries';
import type { TSpatialGridRegistry, TSpatialGridWrapper } from '@/Engine/Spatial/Models';

export const SpatialGridRegistry = (): TSpatialGridRegistry => AbstractEntityRegistry<TSpatialGridWrapper>(RegistryType.SpatialGrid);
