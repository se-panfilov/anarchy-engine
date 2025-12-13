import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TFsmInstanceFactory } from './TFsmInstanceFactory';
import type { TFsmInstanceRegistry } from './TFsmInstanceRegistry';
import type { TFsmSource } from './TFsmSource';
import type { TFsmWrapper } from './TFsmWrapper';

export type TFsmInstanceService = TAbstractService & TWithCreateService<TFsmWrapper, TFsmSource> & TWithFactoryService<TFsmInstanceFactory> & TWithRegistryService<TFsmInstanceRegistry>;
