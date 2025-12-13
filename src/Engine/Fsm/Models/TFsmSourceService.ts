import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TFsmConfig } from './TFsmConfig';
import type { TFsmParams } from './TFsmParams';
import type { TFsmSource } from './TFsmSource';
import type { TFsmSourceFactory } from './TFsmSourceFactory';
import type { TFsmSourceRegistry } from './TFsmSourceRegistry';

export type TFsmSourceService = TAbstractService &
  TWithCreateService<TFsmSource, TFsmParams> &
  TWithCreateFromConfigService<TFsmConfig, TFsmSource> &
  TWithFactoryService<TFsmSourceFactory> &
  TWithRegistryService<TFsmSourceRegistry>;
