import type { TSerializableResourceService } from '@/Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TFsmConfig } from './TFsmConfig';
import type { TFsmParams } from './TFsmParams';
import type { TFsmSource } from './TFsmSource';
import type { TFsmSourceFactory } from './TFsmSourceFactory';
import type { TFsmSourceRegistry } from './TFsmSourceRegistry';

export type TFsmSourceServiceWithCreate = TWithCreateService<TFsmSource, TFsmParams>;
export type TFsmSourceServiceWithCreateFromConfig = TWithCreateFromConfigService<TFsmConfig, TFsmSource>;
export type TFsmSourceServiceWithFactory = TWithFactoryService<TFsmSource, TFsmParams, undefined, TFsmSourceFactory>;
export type TFsmSourceServiceWithRegistry = TWithRegistryService<TFsmSourceRegistry>;

// TODO 15-0-0: Return type might be not TFsmConfig, but something else, check it
export type TFsmSourceService = TSerializableResourceService<TFsmConfig> &
  TFsmSourceServiceWithCreate &
  TFsmSourceServiceWithCreateFromConfig &
  TFsmSourceServiceWithFactory &
  TFsmSourceServiceWithRegistry;
