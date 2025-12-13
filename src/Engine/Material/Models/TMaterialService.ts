import type { TSerializableEntitiesService } from '@/Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TMaterialConfig } from './TMaterialConfig';
import type { TMaterialFactory } from './TMaterialFactory';
import type { TMaterialParams } from './TMaterialParams';
import type { TMaterialRegistry } from './TMaterialRegistry';
import type { TMaterialWrapper } from './TMaterialWrapper';

export type TMaterialServiceWithCreate = TWithCreateService<TMaterialWrapper, TMaterialParams>;
export type TMaterialServiceWithCreateFromConfig = TWithCreateFromConfigService<TMaterialConfig, TMaterialWrapper>;
export type TMaterialServiceWithFactory = TWithFactoryService<TMaterialWrapper, TMaterialParams, undefined, TMaterialFactory>;
export type TMaterialServiceWithRegistry = TWithRegistryService<TMaterialRegistry>;

export type TMaterialService = TSerializableEntitiesService<TMaterialConfig> &
  TMaterialServiceWithCreate &
  TMaterialServiceWithCreateFromConfig &
  TMaterialServiceWithFactory &
  TMaterialServiceWithRegistry;
