import type { TSerializableEntitiesService } from '@/Engine/Abstract';
import type { TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TFsmConfig } from './TFsmConfig';
import type { TFsmInstanceFactory } from './TFsmInstanceFactory';
import type { TFsmInstanceRegistry } from './TFsmInstanceRegistry';
import type { TFsmSource } from './TFsmSource';
import type { TFsmWrapper } from './TFsmWrapper';

export type TFsmInstanceServiceWithCreate = TWithCreateService<TFsmWrapper, TFsmSource>;
export type TFsmInstanceServiceWithFactory = TWithFactoryService<TFsmWrapper, TFsmSource, undefined, TFsmInstanceFactory>;
export type TFsmInstanceServiceWithRegistry = TWithRegistryService<TFsmInstanceRegistry>;

// TODO 15-0-0: Return type might be not TFsmConfig, but something else, check it
export type TFsmInstanceService = TSerializableEntitiesService<TFsmConfig> & TFsmInstanceServiceWithCreate & TFsmInstanceServiceWithFactory & TFsmInstanceServiceWithRegistry;
