import type { EnvMapMappingTypesName } from '@/Engine/EnvMap/Constants';

import type { TEnvMapProps } from './TEnvMapProps';

export type TEnvMapConfig = Omit<TEnvMapProps, 'mapping' | 'texture'> &
  Readonly<{
    mapping?: EnvMapMappingTypesName;
  }>;
