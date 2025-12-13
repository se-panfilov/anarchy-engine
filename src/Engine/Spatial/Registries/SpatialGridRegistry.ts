import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TSpatialGridRegistry, TSpatialGridWrapper } from '@/Engine/Spatial/Models';

export const SpatialGridRegistry = (): TSpatialGridRegistry => RegistryFacade(AbstractEntityRegistry<TSpatialGridWrapper>(RegistryType.SpatialGrid));
