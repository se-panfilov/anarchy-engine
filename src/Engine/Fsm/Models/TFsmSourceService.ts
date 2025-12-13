import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TFsmConfig } from './TFsmConfig';
import type { TFsmParams } from './TFsmParams';
import type { TFsmSource } from './TFsmSource';
import type { TFsmSourceFactory } from './TFsmSourceFactory';
import type { TFsmSourceRegistry } from './TFsmSourceRegistry';

export type TFsmServiceWithCreate = TWithCreateService<TFsmSource, TFsmParams>;
export type TFsmServiceWithCreateFromConfig = TWithCreateFromConfigService<TFsmConfig, TFsmSource>;
export type TFsmServiceWithFactory = TWithFactoryService<TFsmSource, TFsmParams, undefined, TFsmSourceFactory, undefined>;
export type TFsmServiceWithRegistry = TWithRegistryService<TFsmSourceRegistry>;

export type TFsmSourceService = TAbstractService & TFsmServiceWithCreate & TFsmServiceWithCreateFromConfig & TFsmServiceWithFactory & TFsmServiceWithRegistry;
