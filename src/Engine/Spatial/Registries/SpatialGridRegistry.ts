import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractSimpleRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TSpatialGrid, TSpatialGridRegistry } from '@/Engine/Spatial/Models';

export const SpatialGridRegistry = (): TSpatialGridRegistry => RegistryFacade(AbstractSimpleRegistry<TSpatialGrid>(RegistryType.SpatialGrid));
