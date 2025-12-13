import type { TAbstractService } from '@/Engine/Abstract';

import type { TSpace } from './TSpace';
import type { TSpaceConfig } from './TSpaceConfig';
import type { TSpaceFactory } from './TSpaceFactory';
import type { TSpaceParams } from './TSpaceParams';
import type { TSpaceRegistry } from './TSpaceRegistry';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from './TSpaceServiceMixins';

export type TSpaceService = TAbstractService &
  TWithCreateService<TSpace, TSpaceParams> &
  TWithCreateFromConfigService<TSpaceConfig, TSpace> &
  TWithFactoryService<TSpaceFactory> &
  TWithRegistryService<TSpaceRegistry>;
