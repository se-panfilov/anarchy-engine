import type { TSerializableEntitiesService } from '@/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Mixins';

import type { TFsmConfig } from './TFsmConfig';
import type { TFsmParams } from './TFsmParams';
import type { TFsmSource } from './TFsmSource';
import type { TFsmSourceFactory } from './TFsmSourceFactory';
import type { TFsmSourceRegistry } from './TFsmSourceRegistry';

export type TFsmSourceServiceWithCreate = TWithCreateService<TFsmSource, TFsmParams>;
export type TFsmSourceServiceWithCreateFromConfig = TWithCreateFromConfigService<TFsmConfig, TFsmSource>;
export type TFsmSourceServiceWithFactory = TWithFactoryService<TFsmSource, TFsmParams, undefined, TFsmSourceFactory>;
export type TFsmSourceServiceWithRegistry = TWithRegistryService<TFsmSourceRegistry>;

export type TFsmSourceService = TSerializableEntitiesService<TFsmSource, TFsmConfig> &
  TFsmSourceServiceWithCreate &
  TFsmSourceServiceWithCreateFromConfig &
  TFsmSourceServiceWithFactory &
  TFsmSourceServiceWithRegistry;
