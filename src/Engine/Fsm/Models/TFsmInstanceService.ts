import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TFsmInstanceFactory } from './TFsmInstanceFactory';
import type { TFsmInstanceRegistry } from './TFsmInstanceRegistry';
import type { TFsmSource } from './TFsmSource';
import type { TFsmWrapper } from './TFsmWrapper';

export type TFsmServiceWithCreate = TWithCreateService<TFsmWrapper, TFsmSource>;
export type TFsmServiceWithFactory = TWithFactoryService<TFsmWrapper, TFsmSource, undefined, TFsmInstanceFactory, undefined>;
export type TFsmServiceWithRegistry = TWithRegistryService<TFsmInstanceRegistry>;

export type TFsmInstanceService = TAbstractService & TFsmServiceWithCreate & TFsmServiceWithFactory & TFsmServiceWithRegistry;
