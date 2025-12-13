import type { TSerializableEntitiesService } from '@/Abstract';
import type { TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Mixins';

import type { TFsmConfig } from './TFsmConfig';
import type { TFsmInstanceFactory } from './TFsmInstanceFactory';
import type { TFsmInstanceRegistry } from './TFsmInstanceRegistry';
import type { TFsmSource } from './TFsmSource';
import type { TFsmWrapper } from './TFsmWrapper';

export type TFsmInstanceServiceWithCreate = TWithCreateService<TFsmWrapper, TFsmSource>;
export type TFsmInstanceServiceWithFactory = TWithFactoryService<TFsmWrapper, TFsmSource, undefined, TFsmInstanceFactory>;
export type TFsmInstanceServiceWithRegistry = TWithRegistryService<TFsmInstanceRegistry>;

export type TFsmInstanceService = TSerializableEntitiesService<TFsmWrapper, TFsmConfig> & TFsmInstanceServiceWithCreate & TFsmInstanceServiceWithFactory & TFsmInstanceServiceWithRegistry;
