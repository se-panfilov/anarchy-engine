import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { TFsmInstanceFactory } from './TFsmInstanceFactory';
import type { TFsmInstanceRegistry } from './TFsmInstanceRegistry';
import type { TFsmSource } from './TFsmSource';
import type { TFsmWrapper } from './TFsmWrapper';

export type TFsmInstanceService = TWithCreateService<TFsmWrapper, TFsmSource> & TWithFactoryService<TFsmInstanceFactory> & TWithRegistryService<TFsmInstanceRegistry> & TDestroyable;
