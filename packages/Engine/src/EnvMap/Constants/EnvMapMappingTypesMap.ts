import type { AnyMapping } from 'three';
import { EquirectangularReflectionMapping } from 'three';
import { CubeReflectionMapping, CubeRefractionMapping, CubeUVReflectionMapping, EquirectangularRefractionMapping, UVMapping } from 'three/src/constants';

import { EnvMapMappingTypesName } from './EnvMapMappingTypesName';

export const EnvMapMappingTypesMap: Record<string, AnyMapping> = {
  [EnvMapMappingTypesName.UVMapping]: UVMapping,
  [EnvMapMappingTypesName.CubeReflectionMapping]: CubeReflectionMapping,
  [EnvMapMappingTypesName.CubeRefractionMapping]: CubeRefractionMapping,
  [EnvMapMappingTypesName.CubeUVReflectionMapping]: CubeUVReflectionMapping,
  [EnvMapMappingTypesName.EquirectangularReflectionMapping]: EquirectangularReflectionMapping,
  [EnvMapMappingTypesName.EquirectangularRefractionMapping]: EquirectangularRefractionMapping
};
