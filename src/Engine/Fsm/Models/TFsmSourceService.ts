import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TFsmConfig } from './TFsmConfig';
import type { TFsmParams } from './TFsmParams';
import type { TFsmSource } from './TFsmSource';
import type { TFsmSourceFactory } from './TFsmSourceFactory';
import type { TFsmSourceRegistry } from './TFsmSourceRegistry';

export type TFsmSourceServiceWithCreate = TWithCreateService<TFsmSource, TFsmParams>;
export type TFsmSourceServiceWithCreateFromConfig = TWithCreateFromConfigService<TFsmConfig, TFsmSource>;
export type TFsmSourceServiceWithFactory = TWithFactoryService<TFsmSource, TFsmParams, undefined, TFsmSourceFactory, undefined>;
export type TFsmSourceServiceWithRegistry = TWithRegistryService<TFsmSourceRegistry>;

export type TFsmSourceService = TAbstractService & TFsmSourceServiceWithCreate & TFsmSourceServiceWithCreateFromConfig & TFsmSourceServiceWithFactory & TFsmSourceServiceWithRegistry;
